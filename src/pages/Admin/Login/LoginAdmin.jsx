import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/Admin");
  }, []);
  return <div>LoginAdmin</div>;
};

export default LoginAdmin;
