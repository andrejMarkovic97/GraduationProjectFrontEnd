import styles from "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm";
import Course from "./components/course/Courses";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
function App() {
  const [user, setUser] = useState(null);

  const fetchUserData = (jwt) => {
    const api = axios.create({
      baseURL: "https://localhost:44364/",
    });

    console.log("jwt : ", jwt);
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
          <div>
            <Navbar user={user} setUser={setUser} />
            <Routes>
              <Route path="/courses" element={<Course />} />
            </Routes>
          </div>
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
