import React, { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import Main from "../Main";

const IssueLicense = () => {
  const { login } = useUser();
  const endpoint = `http://localhost:3000/api/drivers/${login}/license/request`;

  const labels = ["Номер лицензии", "Категория"];
  const nameForInputsToBackend = ["licenseNumber", "category"];
  return (
    <div className="container mt-5">
      <Main />
      <h1>Запрос на получение лицензии</h1>
      <CustomForm
        endpoint={endpoint}
        labels={labels}
        nameForInputsToBackend={nameForInputsToBackend}
      />
    </div>
  );
};

export default IssueLicense;
