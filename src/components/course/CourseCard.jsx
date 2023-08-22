import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { baseApiUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/details/${course.courseId}`);
  };

  return (
    <Card className="mb-4" style={{ cursor: "pointer" }} onClick={handleClick}>
      <Card.Img
        variant="top"
        src={`${baseApiUrl}${course.imagePath}`}
        style={{ height: "300px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title>{course.name}</Card.Title>

        <Button variant="primary">Learn More</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
}
