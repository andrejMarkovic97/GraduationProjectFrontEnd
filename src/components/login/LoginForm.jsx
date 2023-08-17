import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";

function Login({ fetchUserData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const api = axios.create({
    baseURL: "https://localhost:44364/",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await api.post("api/Auth/Login", user);
      localStorage.setItem("jwt", response.data.authToken);
      fetchUserData(response.data.authToken);
      navigate("/courses");
    } catch (error) {
      console.error("Login failed : ", error.response);
    }
  };

  return (
    <div className={styles["auth-container"]}>
      <Form className={styles["form-auth"]} onSubmit={handleLogin}>
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
