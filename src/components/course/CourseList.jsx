import { useEffect, useState } from "react";
import api, { baseApiUrl } from "../../api";
import { Col, Container, Row } from "react-bootstrap";
import CourseCard from "./CourseCard";
import DeleteModal from "../modal/DeleteModal";
export default function CourseList({ user }) {
  const [courses, setCourses] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleShowModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get("api/Course");
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFunction = async (id) => {
    try {
      await api.delete(`/api/Course/${id}`);
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      {courses ? (
        <Container fluid>
          <Row lg={4} md={5} sm={6}>
            {courses.map((course) => (
              <Col key={course.courseId}>
                {
                  <CourseCard
                    course={course}
                    handleShowModal={handleShowModal}
                    user={user}
                  />
                }
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <h1>No courses</h1>
      )}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}>
          <DeleteModal
            id={selectedId}
            handleDeleteFunction={handleDeleteFunction}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </>
  );
}
