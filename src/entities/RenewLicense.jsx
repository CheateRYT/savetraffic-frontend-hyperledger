import React, { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import Main from "../Main";

const RenewLicense = () => {
  const { login } = useUser();
  const endpoint = `http://localhost:3000/api/drivers/${login}/license/renew/request`;

  const labels = ["Номер лицензии"];
  const nameForInputsToBackend = ["licenseNumber"];
  return (
    <div className="container mt-5">
      <Main />
      <h1>Запрос на продление лицензии</h1>
      <CustomForm
        endpoint={endpoint}
        labels={labels}
        nameForInputsToBackend={nameForInputsToBackend}
      />
    </div>
  );
};

export default RenewLicense;
