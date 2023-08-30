import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import api from "../../api";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function DetailsSessionForm() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const { courseId, sessionId } = useParams();

  useEffect(() => {
    const fetchSessionData = async (sessionId) => {
      if (
        sessionId !== null &&
        sessionId !== undefined &&
        sessionId != "null"
      ) {
        try {
          const response = await api.get(`/api/Session/${sessionId}`);
          if (response.data) {
            console.log(response.data);
            setAddress(response.data.address);
            setCountry(response.data.country);
            setCity(response.data.city);
            setDate(response.data.date);
            setTime(response.data.time);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchSessionData(sessionId);
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sessionDto = {
        SessionId: sessionId,
        CourseId: courseId,
        Address: address,
        City: city,
        Country: country,
        Date: date,
        Time: time,
      };
      //if the sessionId is null -> create new, eitherwise edit existing
      const response = sessionId
        ? await api.put("api/Session", sessionDto)
        : await api.post("api/Session", sessionDto);

      console.log(response);
      console.log(sessionDto);
      navigate(`/courses/sessions/${courseId}`);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="form">
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Col}
              className="form-group "
              controlId="detailsSessionForm.Address"
            >
              <Form.Label className="form-label">Address</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={15}
              />
            </Form.Group>

            <Form.Group
              className="form-group mb-3"
              controlId="detailsSessionForm.City"
            >
              <Form.Label className="form-label">City</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="form-group mb-3"
              controlId="detailsSessionForm.Country"
            >
              <Form.Label className="form-label">Country</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                rows={5}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="form-group mb-3"
              controlId="detailsSessionForm.Date"
            >
              <Form.Label className="form-label">Date</Form.Label>
              <Form.Control
                className="form-input"
                type="date"
                rows={5}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="form-group mb-3"
              controlId="detailsSessionForm.City"
            >
              <Form.Label className="form-label">Time</Form.Label>
              <Form.Control
                className="form-input"
                type="time"
                rows={5}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            {courseId && <Button variant="danger">Delete</Button>}
          </Form>
        </div>
      </div>
    </>
  );
}
