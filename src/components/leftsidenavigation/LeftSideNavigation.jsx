import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import { NavLink, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function LeftSideNavigation({ sections, content, main, id }) {
  const currentPath = window.location.pathname;
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
                    <NavLink
                      to={`/${main}/${section.toLowerCase()}/${id}`}
                      key={index}
                    >
                      <CDBSidebarMenuItem
                        icon="columns"
                        style={{ fontFamily: "Roboto" }}
                        className={
                          currentPath.includes(section.toLowerCase())
                            ? "activeSection"
                            : ""
                        }
                      >
                        {section}
                      </CDBSidebarMenuItem>
                    </NavLink>
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
