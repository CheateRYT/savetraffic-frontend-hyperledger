import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./context/UserProvider";

const Main = () => {
  const navigate = useNavigate();
  const { login, setLogin, role } = useUser();
  const handleClickLogout = () => {
    navigate("/");
    setLogin("");
  };
  useEffect(() => {
    if (login) {
      console.log(login);
    } else {
      navigate("/");
    }
  });
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand" href="#">
          Дпс система
        </p>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Профиль
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entities">
                Все сущности
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/request-register-car">
                Запрос на регистрацию машины
              </Link>
            </li>
            {role === "DpsOfficer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/approve-register-car">
                  Подтверждение регистрации машины
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/request-issue-license">
                Запросить вод удостоверение
              </Link>
            </li>

            {role === "DpsOfficer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/approve-issue-license">
                  Подтвердить вод удостоверение
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/request-renew-license">
                Запрос на Продление водительского удостоверения
              </Link>
            </li>
            {role === "DpsOfficer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/approve-renew-license">
                  Подтвердить Продление водительского удостоверения
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/pay-fine">
                Оплата штрафа
              </Link>
            </li>
            {role === "DpsOfficer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/issue-fine">
                  Выдача штрафа
                </Link>
              </li>
            )}

            <li className="nav-item">
              <button className="nav-link" onClick={handleClickLogout}>
                Выйти из личного кабинета
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Main;
