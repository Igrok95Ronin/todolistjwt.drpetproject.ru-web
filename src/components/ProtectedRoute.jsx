import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ProtectedRoute({ children, setIsAuth }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/protected");
        setAuthorized(true);
        setIsAuth(true);
      } catch (error) {
        if (error.response?.status === 401) {
          try {
            // Пытаемся обновить токен
            const refreshResponse = await api.post("/refresh");
            const newAccessToken = refreshResponse.data.access_token;

            // Повторяем запрос с новым токеном
            api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            await api.get("/protected");

            setAuthorized(true);
            setIsAuth(true);
          } catch (refreshError) {
            // Если обновление токена не удалось, перенаправляем на страницу логина
            setAuthorized(false);
            setIsAuth(false);
            navigate("/login");
          }
        } else {
          setAuthorized(false);
          setIsAuth(false);
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
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