import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import api, { baseApiUrl } from "../../api";
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

export default function CourseList() {
  const [courses, setCourses] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("api/Course");
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      {courses ? (
        <Container fluid>
          <Row lg={4} md={5} sm={6}>
            {courses.map((course) => (
              <Col key={course.courseId}>{<CourseCard course={course} />}</Col>
            ))}
          </Row>
        </Container>
      ) : (
        <h1>No courses</h1>
      )}
    </>
  );
}
