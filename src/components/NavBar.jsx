// src/components/NavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function NavBar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  // Обработчик выхода (Exit)
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      // Если всё ок, ставим isAuth в false
      setIsAuth(false);
      // И перебрасываем на / (или /login)
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при логауте:", err);
    }
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      {/* Если user НЕ авторизован */}
      {!isAuth && (
        <>
          <Link to="/register" style={{ marginRight: "1rem" }}>
            Register
          </Link>
          <Link to="/login" style={{ marginRight: "1rem" }}>
            Login
          </Link>
        </>
      )}

      {/* Если user АВТОРИЗОВАН */}
      {isAuth && (
        <>
          "Имя пользователя"
          <button onClick={handleLogout}>Exit</button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
