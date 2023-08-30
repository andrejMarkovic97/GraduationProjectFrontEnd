import { useEffect, useState } from "react";
import api, { baseApiUrl } from "../../api";
import { Col, Container, Row } from "react-bootstrap";
import CourseCard from "./CourseCard";

export default function CourseList() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("api/Course");
        setCourses(response.data);
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
