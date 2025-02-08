import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ActivateAccount: React.FC = () => {
  const location = useLocation();
  const [status, setStatus] = useState<string>("Loading...");

  // Parse email and activateCode from the query parameters
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const activateCode = searchParams.get("activateCode");

  // Đưa hàm activateAccount ra ngoài useEffect
  const activateAccount = async () => {
    if (!email || !activateCode) {
      setStatus("Invalid activation link. Missing email or activation code.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/account/activate?email=${email}&activateCode=${activateCode}`
      );
      if (response.ok) {
        setStatus("Account activated successfully!");
      } else {
        setStatus("Activation failed. Please try again.");
      }
      console.log(response);
    } catch (error) {
      setStatus(
        "An error occurred. Please check your connection and try again."
      );
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={activateAccount}>Activate Here!!</button>
      {status}
    </div>
  );
};

export default ActivateAccount;
