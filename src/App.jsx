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
import { Container } from "react-bootstrap";
import DetailsCourseForm from "./components/course/DetailsCourseForm";
import CourseSessions from "./components/course/CourseSessions";
import CourseAttendances from "./components/course/CourseAttendances";
import SessionDashboard from "./components/session/SessionDashboard";
import DetailsSessionForm from "./components/session/DetailsSessionForm";
import SessionAttendances from "./components/session/SessionAttendances";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    fetchUserData(jwt);
  }, []);

  const fetchUserData = (jwt) => {
    if (jwt) {
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
    }
  };

  const CourseRoute = ({ children }) => (
    <CourseDashboard>{children}</CourseDashboard>
  );

  const SessionRoute = ({ children }) => (
    <SessionDashboard>{children}</SessionDashboard>
  );

  return (
    <div>
      <Router>
        {user ? (
          <Container fluid>
            <Navbar user={user} setUser={setUser} />
            <Routes>
              <>
                <Route path="/course/list" element={<CourseList />} />
                <Route
                  path="/course/details/:id?"
                  element={
                    <CourseRoute>
                      <DetailsCourseForm />
                    </CourseRoute>
                  }
                />
                <Route
                  path="/course/sessions/:id"
                  element={
                    <CourseRoute>
                      <CourseSessions />
                    </CourseRoute>
                  }
                />
                <Route
                  path="/course/attendances/:id"
                  element={
                    <CourseRoute>
                      <CourseAttendances />
                    </CourseRoute>
                  }
                />
                <Route
                  path="/session/details/:courseId/:sessionId?"
                  element={
                    <SessionRoute>
                      <DetailsSessionForm />
                    </SessionRoute>
                  }
                />
                <Route
                  path="/session/attendances/:id"
                  element={
                    <SessionRoute>
                      <SessionAttendances />
                    </SessionRoute>
                  }
                />
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
