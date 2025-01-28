import React, { useEffect } from "react";
import { useUser } from "../context/UserProvider";
import CustomForm from "../components/CustomForm";
import Main from "../Main";

const PayFine = () => {
  const { login } = useUser();
  const endpoint = `http://localhost:3000/api/drivers/${login}/fine/pay`;

  const labels = [];
  const nameForInputsToBackend = [];
  return (
    <div className="container mt-5">
      <Main />
      <h1>Выплата штрафа</h1>
      <CustomForm
        endpoint={endpoint}
        labels={labels}
        nameForInputsToBackend={nameForInputsToBackend}
      />
    </div>
  );
};

export default PayFine;
