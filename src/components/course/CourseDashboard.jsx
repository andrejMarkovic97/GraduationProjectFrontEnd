import React, { useState } from "react";
import DetailsCourseForm from "./DetailsCourseForm";
import CourseSessions from "./CourseSessions";
import LeftSideNavigation from "../leftsidenavigation/LeftSideNavigation";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CourseDashboard() {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionChange = () => {
    setSelectedSection("Details");
  };

  const { courseId } = useParams();

  const sections = [
    "Details",
    "Sessions",
    "Course Attendences",
    "Certificates",
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "Details":
        return <DetailsCourseForm courseId={courseId} />;
      // case "Attendances":
      //   return <AttendanceList courseId={courseId} />;
      case "Sessions":
        return <CourseSessions courseId={courseId} />;
      // case "Certificates":
      //   return <Certificates courseId={courseId} />;
      default:
        handleSectionChange("Details");
        return <DetailsCourseForm courseId={courseId} />;
    }
  };

  return (
    <>
      <LeftSideNavigation
        content={renderContent()}
        setSelectedSection={setSelectedSection}
        selectedSection={selectedSection}
        sections={sections}
      />
    </>
  );
}
