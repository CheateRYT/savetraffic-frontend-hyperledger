import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const CustomForm = ({ endpoint, labels, nameForInputsToBackend }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Ошибка при отправке данных");
      }
      const result = await response.json();
      setSuccess(result.message);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    if (!login) navigate("/");
  }, [login, navigate]);

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {labels.map((label, index) => (
        <Form.Group controlId={`formBasic${index}`} key={index}>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type="text"
            name={nameForInputsToBackend[index]} // Используем nameForInputsToBackend для имени поля
            placeholder={`Введите ${label.toLowerCase()}`}
            onChange={handleChange}
          />
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        Отправить
      </Button>
    </Form>
  );
};

export default CustomForm;
