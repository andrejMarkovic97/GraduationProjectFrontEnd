import { useCallback, useEffect, useState } from "react";
import api from "../../api";
import Table from "../table/Table";
import { useParams } from "react-router-dom";
import MultiSelectUserModal from "../modal/MultiSelectUserModal";

export default function SessionAttendances() {
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
      await api.delete(`/api/SessionAttendance/${id}/${userId}`);
      fetchTableData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTableData = useCallback(async () => {
    try {
      const response = await api.get(
        `api/SessionAttendance/GetSessionAttendances/${id}`
      );
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchTableData();
  }, [id, fetchTableData]);

  const mapToSessionAttendanceDto = (user, sessionId) => {
    return {
      UserId: user.value,
      SessionId: sessionId,
    };
  };

  const handleSubmit = async (users) => {
    try {
      const sessionAttendanceDtos = users.map((user) =>
        mapToSessionAttendanceDto(user, id)
      );
      await api.post(
        `/api/SessionAttendance/AddSessionAttendances`,
        sessionAttendanceDtos
      );
      fetchTableData();
    } catch (error) {
      console.error(error);
    }
  };

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
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
            requestEndpoint={`api/Session/GetUsersNotAttendingSession/${id}`}
            setIsOpen={setIsOpen}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
}
