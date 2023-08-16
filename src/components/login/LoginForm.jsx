import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = axios.create({
    baseURL: "https://localhost:44364/",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    console.log("user created");
    try {
      const response = await api.post("api/Auth/Login", user);
      const token = response.data;
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed : ", error.response.data);
    }
  };

  return (
    <div className="form-auth">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
        </Form.Group>
        <Link to="/register">Don't have an account? Register here</Link>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
