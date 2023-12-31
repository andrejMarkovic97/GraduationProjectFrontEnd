import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./Navbar.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className={styles["navbar-brand"]}>
          Graduation
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.role.roleName === "Instructor" && (
              <Nav.Link
                as={Link}
                className={styles["nav-link"]}
                to={`/course/details`}
              >
                Create Course
              </Nav.Link>
            )}
            <Nav.Link
              as={Link}
              className={styles["nav-link"]}
              to="/course/list"
            >
              Courses
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown
          className=""
          title={`${user.firstName} ${user.lastName}`}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default Navigation;
