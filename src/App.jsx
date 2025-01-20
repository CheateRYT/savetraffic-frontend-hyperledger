import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useUser } from "./context/UserProvider";

function App() {
  // Состояния для формы авторизации
  const [authLogin, setAuthLogin] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authKey, setAuthKey] = useState("");
  const navigate = useNavigate();

  // Состояния для формы регистрации
  const [regLogin, setRegLogin] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regKey, setRegKey] = useState("");
  const [regRole, setRegRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [regBalance, setRegBalance] = useState("");
  const [yearStartedDriving, setYearStartedDriving] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { setLogin } = useUser(); // Исправлено

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

      if (response.ok) {
        console.log(data.user.login);
        setLogin(data.user.login);

        navigate("/main");
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
          balance: regBalance,
          role: regRole,
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
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
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
            <Form.Group controlId="formRegBalance">
              <Form.Label>Баланс</Form.Label>
              <Form.Control
                type="string"
                placeholder="Введите баланс"
                value={regBalance}
                onChange={(e) => setRegBalance(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formRegRole">
              <Form.Label>Роль</Form.Label>
              <Form.Select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                required
              >
                <option value="">Выберите роль</option>
                <option value={"Driver"}>Водитель</option>
                <option value={"DpsOfficer"}>ДПС</option>
              </Form.Select>
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
