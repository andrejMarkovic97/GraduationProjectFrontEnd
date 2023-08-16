import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BasicExample() {
  const [role, setRole] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "https://localhost:44364/",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      setError("The passwords must match!");
      console.log("passwords must match");
    } else {
      setError(null);
      const user = {
        Email: email,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        RoleId: role,
      };

      try {
        const response = await api.post("api/Auth/Register", user);
        console.log("response data : ", response.data);
        navigate("/");
      } catch (error) {
        console.log("error");
      }
    }
  };
  return (
    <Form className="form-auth" onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error !== null && (
          <Form.Text className="text-danger">Passwords must match</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicReTypePassword">
        <Form.Label>Retype Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          required
        />
        {error !== null && (
          <Form.Text className="text-danger">Passwords must match</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="Learner"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
              checked={role === 0}
              onChange={() => setRole(0)}
            />
            <Form.Check
              inline
              label="Instructor"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
              checked={role === 1}
              onChange={() => setRole(1)}
            />
          </div>
        ))}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default BasicExample;
