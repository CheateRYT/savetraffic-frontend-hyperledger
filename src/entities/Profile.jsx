import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Main from "../Main";

const Profile = () => {
  const { login } = useUser();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/");
      return;
    }

    const getUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/driver/${login}`
        );

        if (!response.ok) {
          throw new Error("Ошибка при получении данных пользователя");
        }

        const result = await response.json();
        setProfile(result);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  if (!profile) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mt-5">
      <Main />
      <Card>
        <Card.Body>
          <Card.Title>Профиль пользователя</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {profile.login}
          </Card.Subtitle>
          <Card.Text>
            <strong>Полное имя:</strong> {profile.FullName}
          </Card.Text>
          <Card.Text>
            <strong>Баланс:</strong> {profile.Balance} рублей
          </Card.Text>
          <Card.Text>
            <strong>Роль:</strong>{" "}
            {profile.Role === "DpsOfficer" ? "ДПС" : "Водитель"}
          </Card.Text>
          <Card.Text>
            <strong>Опыт вождения:</strong> {profile.Experience} лет
          </Card.Text>
          <Card.Text>
            <strong>Непогашенные штрафы:</strong> {profile.UnpaidFines}
          </Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Водительские удостоверения:</strong>
            {profile.DrivingLicenses.length > 0 ? (
              <ul>
                {profile.DrivingLicenses.map((license, index) => (
                  <li key={index}>
                    Номер: {license.licenseNumber}, Категория:{" "}
                    {license.category}, Дата истечения: {license.expiryDate}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет водительских удостоверений.</p>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Транспортные средства:</strong>
            {profile.Vehicles.length > 0 ? (
              <ul>
                {profile.Vehicles.map((vehicle, index) => (
                  <li key={index}>
                    Категория: {vehicle.vehicleCategory}, Рыночная стоимость:{" "}
                    {vehicle.marketValue}, Период эксплуатации:{" "}
                    {vehicle.exploitationPeriod}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет зарегистрированных транспортных средств.</p>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Profile;
