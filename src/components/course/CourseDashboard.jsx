import React, { Children, useEffect, useState } from "react";
import DetailsCourseForm from "./DetailsCourseForm";
import CourseSessions from "./CourseSessions";
import LeftSideNavigation from "../leftsidenavigation/LeftSideNavigation";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CourseDashboard({ children }) {
  const sections = ["Details", "Sessions", "Attendances"];
  const { id } = useParams();
  return (
    <>
      <LeftSideNavigation
        content={children}
        sections={sections}
        main={"course"}
        id={id}
      />
    </>
  );
}
