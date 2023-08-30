import { useEffect, useState } from "react";
import api from "../../api";
import Table from "../table/Table";
import { useNavigate, useParams } from "react-router-dom";

export default function CourseSessions() {
  const navigate = useNavigate();

  const { id } = useParams();
  const handleCreateFunction = () => {
    navigate(`/session/details/${id}`);
  };

  const handleRowClick = (sessionId) => {
    navigate(`/session/details/${id}/${sessionId}`);
  };

  const handleDeleteFunction = async (sessionId) => {
    try {
      await api.delete(`/api/Session/${sessionId}`);
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

  const endpoint = `/Session/GetCourseSessions/${id}`;

  return (
    <Table
      id={id}
      endpoint={endpoint}
      headers={headers}
      rows={rows}
      handleCreateFunction={handleCreateFunction}
      handleRowClick={handleRowClick}
      handleDeleteFunction={handleDeleteFunction}
    />
  );
}
