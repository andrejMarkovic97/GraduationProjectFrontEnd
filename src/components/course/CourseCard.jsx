import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import api, { baseApiUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

export default function CourseCard({ course, handleShowModal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/details/${course.courseId}`);
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src={`${baseApiUrl}${course.imagePath}`}
          style={{ height: "300px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title>{course.name}</Card.Title>
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
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </>
  );
}
