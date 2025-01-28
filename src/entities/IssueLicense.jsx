import React, { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import Main from "../Main";

const IssueLicense = () => {
  const { login } = useUser();
  const endpoint = `http://localhost:3000/api/drivers/${login}/vehicle/request`;

  // Определяем метки для формы
  const labels = ["Категория", "Рыночная стоимость", "Период эксплуатации"];
  const nameForInputsToBackend = [
    "vehicleCategory",
    "marketValue",
    "exploitationPeriod",
  ];
  return (
    <div className="container mt-5">
      <Main />
      <h1>Регистрация транспортного средства</h1>
      <CustomForm
        endpoint={endpoint}
        labels={labels}
        nameForInputsToBackend={nameForInputsToBackend}
      />
    </div>
  );
};

export default IssueLicense;
