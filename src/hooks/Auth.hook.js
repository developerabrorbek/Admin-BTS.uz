import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

export const useIsAuthCustom = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && role) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [role, token,navigate]);
};
