import React, { Children, useEffect, useState } from "react";
import LeftSideNavigation from "../leftsidenavigation/LeftSideNavigation";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CourseDashboard({ children }) {
  const sections = ["Details", "Attendances"];

  const { courseId, sessionId } = useParams();
  return (
    <>
      <LeftSideNavigation
        content={children}
        sections={sections}
        main={"session"}
        id={sessionId}
      />
    </>
  );
}
