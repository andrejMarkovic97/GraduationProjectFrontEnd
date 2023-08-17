import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Navigate, useNavigate } from "react-router-dom";

function Navigation({ user, setUser }) {
  console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>

            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NavDropdown
          className=""
          title={`${user.firstName} ${user.lastName}`}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
}

export default Navigation;
