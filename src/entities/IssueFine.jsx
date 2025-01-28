import React, { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import Main from "../Main";

const IssueFine = () => {
  const { login } = useUser();
  const endpoint = `http://localhost:3000/api/drivers/${login}/fine/issue`;

  const labels = ["Логин получателя"];
  const nameForInputsToBackend = ["recipientLogin"];
  return (
    <div className="container mt-5">
      <Main />
      <h1>Выписка штрафа</h1>
      <CustomForm
        endpoint={endpoint}
        labels={labels}
        nameForInputsToBackend={nameForInputsToBackend}
      />
    </div>
  );
};

export default IssueFine;
