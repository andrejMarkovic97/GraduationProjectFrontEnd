import { useEffect, useState } from "react";
import api from "../../api";
import Table from "../table/Table";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelectUserModal from "../modal/MultiSelectUserModal";

export default function CourseAttendances() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleCreateFunction = () => {
    setIsOpen(true);
  };

  const handleRowClick = (sessionId) => {
    // user details modal
  };

  const handleDeleteFunction = async (userId) => {
    try {
      await api.delete(`/api/CourseAttendance/${id}/${userId}`);
      navigate(`/course/attendances/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const mapToCourseAttendanceDto = (user, courseId) => {
    return {
      UserId: user.value, // Assuming UserId is of type Guid
      CourseId: courseId, // Assuming CourseId is of type Guid
    };
  };
  const handleSubmit = async (users) => {
    try {
      const courseAttendanceDtos = users.map((user) =>
        mapToCourseAttendanceDto(user, id)
      );
      await api.post(
        `/api/CourseAttendance/AddCourseAttendances`,
        courseAttendanceDtos
      );
      navigate(`/course/attendances/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    {
      label: "Number of sessions for certificate",
      key: "numberOfSessionsForCertificate",
    },
    { label: "Attended sessions", key: "attendedSessions" },
    { label: "Has certificate", key: "hasCertificate" },
  ];

  const rows = ["userId", ...headers.map((header) => header.key)];

  const endpoint = `/CourseAttendance/GetCourseAttendances/${id}`;

  return (
    <>
      <Table
        id={id}
        endpoint={endpoint}
        headers={headers}
        rows={rows}
        handleCreateFunction={handleCreateFunction}
        handleRowClick={handleRowClick}
        handleDeleteFunction={handleDeleteFunction}
      />
      {isOpen && (
        <MultiSelectUserModal
          requestEndpoint={`api/Course/GetUsersNotAttendingCourse/${id}`}
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
