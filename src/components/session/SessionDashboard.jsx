import React, { Children, useEffect, useState } from "react";
import LeftSideNavigation from "../leftsidenavigation/LeftSideNavigation";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CourseDashboard({ children }) {
  const sections = ["Details", "Attendances"];

  return (
    <>
      <LeftSideNavigation
        content={children}
        sections={sections}
        main={"session"}
      />
    </>
  );
}
