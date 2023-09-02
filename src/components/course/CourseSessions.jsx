import { useEffect, useState } from "react";
import api from "../../api";
import Table from "../table/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";

export default function CourseSessions() {
  const [tableData, setTableData] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const fetchTableData = useCallback(async () => {
    try {
      const response = await api.get(`/api/Session/GetCourseSessions/${id}`);
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchTableData();
  }, [id, fetchTableData]);

  const handleCreateFunction = () => {
    navigate(`/session/details/${id}`);
  };

  const handleRowClick = (sessionId) => {
    navigate(`/session/details/${id}/${sessionId}`);
  };

  const handleDeleteFunction = async (sessionId) => {
    try {
      await api.delete(`/api/Session/${sessionId}`);
      fetchTableData();
    } catch (error) {
      console.log(error);
    }
  };

  const headers = [
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "Country", key: "country" },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
  ];

  const rows = ["sessionId", ...headers.map((header) => header.key)];

  return (
    <Table
      id={id}
      data={tableData}
      headers={headers}
      rows={rows}
      handleCreateFunction={handleCreateFunction}
      handleRowClick={handleRowClick}
      handleDeleteFunction={handleDeleteFunction}
    />
  );
}
