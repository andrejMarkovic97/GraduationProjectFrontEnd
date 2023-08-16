import styles from "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import RegisterForm from "./components/register/RegisterForm";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
