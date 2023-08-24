import styles from "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm";
import CourseList from "./components/course/CourseList";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseDashboard from "./components/course/CourseDashboard";
import { Col, Container, Row } from "react-bootstrap";
function App() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState(null);

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    fetchUserData(jwt);
  }, []);

  const fetchUserData = (jwt) => {
    const api = axios.create({
      baseURL: "https://localhost:44364/",
    });
    api
      .get("/api/User/GetActiveUser", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  return (
    <div>
      <Router>
        {user ? (
          <Container fluid>
            <Navbar user={user} setUser={setUser} />
            <Routes>
              <>
                <Route path="/course/list" element={<CourseList />} />

                <Route path="/course/:courseId" element={<CourseDashboard />} />
              </>
            </Routes>
            <Footer />
          </Container>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<LoginForm fetchUserData={fetchUserData} />}
            />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
