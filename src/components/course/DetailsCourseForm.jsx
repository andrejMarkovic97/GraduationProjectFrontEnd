import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import api from "../../api";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LeftSideNavigation from "../leftsidenavigation/LeftSideNavigation";

export default function DetailsCourseForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfSessions, setNumberOfSessions] = useState(1);
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("api/Category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []); // Remove categories from the dependency array

  useEffect(() => {
    const fetchCourseData = async (id) => {
      try {
        if (id && id !== "null") {
          const response = await api.get(`/api/Course/${id}`);
          if (response) {
            setName(response.data.name);
            setDescription(response.data.description);
            setSelectedCategory(response.data.categoryId);
            setSelectedTopic(response.data.topicId);
            setNumberOfSessions(response.data.numberOfSessionsForCertificate);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchCourseData(id);
    }
  }, [id]);

  // Separate useEffect to set the selected category
  useEffect(() => {
    if (categories && selectedCategory && selectedTopic) {
      // No need to find the category again, you already have it from the course data
      const category = categories.find(
        (c) => c.categoryId === selectedCategory
      );
      if (category) {
        const topic = category.topics.find((t) => t.topicId === selectedTopic);
        if (topic) {
          console.log(topic);
          setSelectedCategory(category);
          setSelectedTopic(topic);
        }
      }
    } else if (categories && categories.length > 0) {
      const initialCategory = categories[0];
      setSelectedCategory(initialCategory);
      if (initialCategory.topics && initialCategory.topics.length > 0) {
        setSelectedTopic(initialCategory.topics[0].topicId);
      }
    }
  }, [categories, selectedCategory, selectedTopic]);

  const handleSelectCategory = (id) => {
    const category = categories.find((c) => c.categoryId == id);
    setSelectedCategory(category);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("NumberOfSessionsForCertificate", numberOfSessions);
    formData.append("CategoryId", selectedCategory.categoryId);
    formData.append("TopicId", selectedTopic);
    formData.append("Image", image);

    try {
      const response = await api.post("/api/Course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/courses/list`);
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
              className="form-group mb-3"
              controlId="detailsCourseForm.Name"
            >
              <Form.Label className="form-label">Name</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="form-group mb-3"
              controlId="detailsCourseForm.Description"
            >
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                className="form-input"
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="form-group mb-3"
              controlId="detailsCourseForm.NumberOfSessions"
            >
              <Form.Label className="form-label">
                Number of sessions needed for certificate
              </Form.Label>
              <Form.Control
                className="form-input"
                type="number"
                rows={5}
                value={numberOfSessions}
                onChange={(e) => setNumberOfSessions(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="detailsCourseForm.Image"
              className="form-group mb-3"
            >
              <Form.Label className="form-label">Course Logo</Form.Label>
              <Form.Control
                className="form-input"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
              />
            </Form.Group>
            {categories && (
              <>
                <Form.Group
                  controlId="detailsCourseForm.CategoryDropdown"
                  className="form-group mb-3"
                >
                  <Form.Label className="form-label">Category</Form.Label>
                  <Form.Select
                    aria-label="Category list"
                    value={
                      selectedCategory
                        ? selectedCategory.categoryId
                        : categories[0].categoryId
                    }
                    onChange={(e) => handleSelectCategory(e.target.value)}
                  >
                    {categories?.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  controlId="detailsCourseForm.TopicDropdown"
                  className="mb-3"
                >
                  <Form.Label>Topic</Form.Label>
                  <Form.Select
                    aria-label="Topic list"
                    value={
                      selectedTopic
                        ? selectedTopic.topicId
                        : categories[0].topics[0]
                    }
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    {selectedCategory?.topics?.map((topic) => (
                      <option key={topic.topicId} value={topic.topicId}>
                        {topic.topicName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit">
              Submit
            </Button>
            {id && <Button variant="danger">Delete</Button>}
          </Form>
        </div>
      </div>
    </>
  );
}
