import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import api, { baseApiUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function CourseCard({ course, handleShowModal, user }) {
  const navigate = useNavigate();
  const [courseAttendance, setCourseAttendance] = useState(null);

  const handleClick = () => {
    if (user.role.roleName === "Instructor") {
      navigate(`/course/details/${course.courseId}`);
    } else {
      addCourseAttendance();
    }
  };

  const addCourseAttendance = async () => {
    const courseAttendanceList = [];

    const courseAttendanceDto = {
      courseId: course.courseId,
      userId: user.userId,
    };

    courseAttendanceList.push(courseAttendanceDto);
    try {
      await api.post(
        `/api/CourseAttendance/AddCourseAttendances`,
        courseAttendanceList
      );
      user.courseAttendances.push(courseAttendanceDto);
    } catch (error) {
      console.log(error);
    }
  };

  const IsEnrolled = () => {
    var attendance = user.courseAttendances.find(
      (ca) => ca.courseId === course.courseId
    );
    return attendance ? true : false;
  };

  return (
    <>
      <Card className="mb-4 mt-2">
        <Card.Img
          variant="top"
          src={`${baseApiUrl}${course.imagePath}`}
          style={{ height: "300px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title>{course.name}</Card.Title>
          {user.role.roleName === "Instructor" ? (
            <ButtonGroup className="w-100 justify-content-between">
              <Button variant="outline-primary" onClick={handleClick}>
                Learn More
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => handleShowModal(course.courseId)}
              >
                Delete
              </Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup className="w-100 justify-content-between">
              <Button
                variant="outline-primary"
                disabled={IsEnrolled() ? true : false}
                onClick={handleClick}
              >
                {IsEnrolled() ? "Already enrolled" : "Enroll now"}
              </Button>
            </ButtonGroup>
          )}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 min ago</small>
        </Card.Footer>
      </Card>
    </>
  );
}
