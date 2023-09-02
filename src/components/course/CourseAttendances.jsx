import { useCallback, useEffect, useState } from "react";
import api from "../../api";
import Table from "../table/Table";
import { useParams } from "react-router-dom";
import MultiSelectUserModal from "../modal/MultiSelectUserModal";

export default function CourseAttendances() {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState(null);

  const { id } = useParams();

  const handleCreateFunction = () => {
    setIsOpen(true);
  };

  const handleRowClick = (userId) => {
    // user details modal
  };

  const handleDeleteFunction = async (userId) => {
    try {
      await api.delete(`/api/CourseAttendance/${id}/${userId}`);
      fetchTableData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTableData = useCallback(async () => {
    try {
      const response = await api.get(
        `api/CourseAttendance/GetCourseAttendances/${id}`
      );
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchTableData();
  }, [id, fetchTableData]);

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
      fetchTableData();
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

  return (
    <>
      <Table
        id={id}
        data={tableData}
        headers={headers}
        rows={rows}
        handleCreateFunction={handleCreateFunction}
        handleRowClick={handleRowClick}
        handleDeleteFunction={handleDeleteFunction}
      />
      {isOpen && (
        <div className="overlay">
          <MultiSelectUserModal
            requestEndpoint={`api/Course/GetUsersNotAttendingCourse/${id}`}
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
}
