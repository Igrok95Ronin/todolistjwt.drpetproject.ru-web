// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Оборачиваем любую страницу этим компонентом
function ProtectedRoute({ children, setIsAuth }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/protected")
      .then(() => {
        setAuthorized(true);
        setLoading(false);
        // Если запрос прошёл - isAuth = true
        setIsAuth(true);
      })
      .catch(() => {
        // Если ошибка - не авторизован
        setAuthorized(false);
        setLoading(false);
        setIsAuth(false);
        navigate("/login");
      });
  }, [navigate, setIsAuth]);

  if (loading) {
    return <div>Checking authorization...</div>;
  }

  if (authorized) {
    return <>{children}</>;
  }

  return null;
}

export default ProtectedRoute;
