import React, { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import Main from "../Main";

const RenewLicenseApprove = () => {
  const { login } = useUser();
  const endpoint = `http://localhost:3000/api/officers/${login}/license/renew/approve`;

  const labels = ["Логин получателя", "Индекс запроса"];
  const nameForInputsToBackend = ["recipientLogin", "requestIndex"];
  return (
    <div className="container mt-5">
      <Main />
      <h1>Подтверждение запроса на продление лицензии</h1>
      <CustomForm
        endpoint={endpoint}
        labels={labels}
        nameForInputsToBackend={nameForInputsToBackend}
      />
    </div>
  );
};

export default RenewLicenseApprove;
