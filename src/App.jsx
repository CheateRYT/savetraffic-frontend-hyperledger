import { useState } from "react";
import "./App.css";
import {
  Form,
  Button,
  Navbar,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

function App() {
  // Состояния для формы авторизации
  const [authLogin, setAuthLogin] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authKey, setAuthKey] = useState("");

  // Состояния для формы регистрации
  const [regLogin, setRegLogin] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regKey, setRegKey] = useState("");
  const [fullName, setFullName] = useState("");
  const [yearStartedDriving, setYearStartedDriving] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: authLogin,
          password: authPassword,
          key: authKey,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Ошибка при авторизации:", err);
      setError("Ошибка при авторизации");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: regLogin,
          password: regPassword,
          key: regKey,
          userId: Date.now(), // Простой способ создать уникальный userId
          balance: 0, // Начальный баланс
          role: "user", // Роль по умолчанию
          fullName,
          yearStartedDriving,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error("Ошибка при создании пользователя:", err);
      setError("Ошибка при создании пользователя");
    }
  };

  return (
    <Container>
      <Navbar bg="light">
        <Navbar.Brand>ДПС Система</Navbar.Brand>
        <Navbar.Text>Авторизация</Navbar.Text>
      </Navbar>
      <Row className="mt-4">
        <Col md={6}>
          <h3>Авторизация</h3>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleAuthSubmit}>
            <Form.Group controlId="formLogin">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите логин"
                value={authLogin}
                onChange={(e) => setAuthLogin(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formKey">
              <Form.Label>Ключ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ключ"
                value={authKey}
                onChange={(e) => setAuthKey(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Войти
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3>Регистрация</h3>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>Полное имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите полное имя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYearStartedDriving">
              <Form.Label>Год начала вождения</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите год начала вождения"
                value={yearStartedDriving}
                onChange={(e) => setYearStartedDriving(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRegLogin">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите логин"
                value={regLogin}
                onChange={(e) => setRegLogin(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRegPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRegKey">
              <Form.Label>Ключ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ключ"
                value={regKey}
                onChange={(e) => setRegKey(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Зарегистрироваться
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
