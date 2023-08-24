import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import DetailsCourseForm from "../course/DetailsCourseForm";
import { NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default function LeftSideNavigation({
  sections,
  content,
  selectedSection,
  setSelectedSection,
}) {
  const handleClick = (section) => {
    console.log("Click : ", section);
    setSelectedSection(section);
  };

  return (
    <>
      <Row>
        <Col lg={2} style={{ paddingLeft: 0 }}>
          <div
            style={{
              display: "flex",
              height: "100vh",
              overflow: "scroll initial",
            }}
          >
            <CDBSidebar textColor="#fff" backgroundColor="#333">
              <CDBSidebarHeader>
                <h4 style={{ textAlign: "center", fontFamily: "Roboto" }}>
                  Navigation
                </h4>
              </CDBSidebarHeader>

              <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                  {sections.map((section, index) => (
                    <div key={index} onClick={() => handleClick(section)}>
                      <NavLink
                        className={
                          selectedSection === section ? "activeClicked" : ""
                        }
                      >
                        <CDBSidebarMenuItem
                          icon="columns"
                          style={{ fontFamily: "Roboto" }}
                        >
                          {section}
                        </CDBSidebarMenuItem>
                      </NavLink>
                    </div>
                  ))}
                </CDBSidebarMenu>
              </CDBSidebarContent>

              <CDBSidebarFooter style={{ textAlign: "center" }}>
                <div
                  style={{
                    padding: "20px 5px",
                  }}
                >
                  Sidebar Footer
                </div>
              </CDBSidebarFooter>
            </CDBSidebar>
          </div>
        </Col>
        <Col className="col-fill" style={{ marginLeft: 15, paddingTop: 0 }}>
          {content}
        </Col>
      </Row>
    </>
  );
}
