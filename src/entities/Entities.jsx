import React, { useEffect, useState } from "react";
import { Card, Col, Row, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const Entities = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    if (!login) navigate("/");
  }, [login, navigate]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/drivers");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных водителей");
        }
        const data = await response.json();
        setDrivers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <Container>
      <h1 className="mt-4">Список сущностей в системе</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {drivers.map((driver) => (
          <Col md={4} key={driver.login} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{driver.FullName}</Card.Title>
                {driver.login === "bank" ? (
                  <Card.Subtitle className="mb-2 text-muted">
                    Банк
                  </Card.Subtitle>
                ) : (
                  <Card.Subtitle className="mb-2 text-muted">
                    Логин: {driver.login}
                  </Card.Subtitle>
                )}
                <Card.Text>
                  <strong>Баланс:</strong> {driver.Balance} ProfiCoin
                  <br />
                  {driver.login !== "bank" && (
                    <>
                      <strong>Роль:</strong>{" "}
                      {driver.Role === "DpsOfficer" ? "ДПС" : "Водитель"}
                      <br />
                      <strong>Опыт:</strong> {driver.Experience} лет
                      <br />
                      <strong>Неоплаченные штрафы:</strong> {driver.UnpaidFines}
                      <br />
                      <strong>Год начала вождения:</strong>{" "}
                      {driver.YearStartedDriving || "Не указано"}
                    </>
                  )}
                </Card.Text>

                {driver.login !== "bank" && (
                  <>
                    <Card.Text>
                      <strong>Водительские удостоверения:</strong>
                      {driver.DrivingLicenses &&
                      driver.DrivingLicenses.length > 0 ? (
                        <ul>
                          {driver.DrivingLicenses.map((license, index) => (
                            <li key={index}>
                              Номер: {license.licenseNumber}, Категория:{" "}
                              {license.category}, Дата истечения:{" "}
                              {license.expiryDate}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Нет водительских удостоверений.</p>
                      )}
                    </Card.Text>

                    <Card.Text>
                      <strong>Транспортные средства:</strong>
                      {driver.Vehicles && driver.Vehicles.length > 0 ? (
                        <ul>
                          {driver.Vehicles.map((vehicle, index) => (
                            <li key={index}>
                              Категория: {vehicle.vehicleCategory}, Рыночная
                              стоимость: {vehicle.marketValue}, Период
                              эксплуатации: {vehicle.exploitationPeriod}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Нет зарегистрированных транспортных средств.</p>
                      )}
                    </Card.Text>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Entities;