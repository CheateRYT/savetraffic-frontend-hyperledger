import React from "react";
import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import Main from "../Main";

const RegisterCarApprove = () => {
  const { login } = useUser();
  const endpoint = `http://localhost:3000/api/officers/${login}/vehicle/approve`;

  // Определяем метки для формы
  const labels = ["Логин клиента", "Индекс запроса"];
  const nameForInputsToBackend = [
    "recipientLogin",
    "requestIndex",
    "exploitationPeriod",
  ];
  return (
    <div className="container mt-5">
      <Main />
      <h1>Подтверждение регистрации транспортного средства</h1>
      <CustomForm
        endpoint={endpoint}
        labels={labels}
        nameForInputsToBackend={nameForInputsToBackend}
      />
    </div>
  );
};

export default RegisterCarApprove;
