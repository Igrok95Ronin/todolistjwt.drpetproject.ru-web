// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // Допустим, мы хотим при загрузке приложения проверить авторизацию 1 раз
  useEffect(() => {
    checkAuth();
  }, []);

  // Функция для проверки авторизации
  const checkAuth = async () => {
    try {
      await api.get("/protected"); // если 200 - всё ок
      setIsAuth(true);
    } catch (err) {
      // если ошибка - значит не авторизованы
      setIsAuth(false);
    }
  };

  return (
    <BrowserRouter>
      {/* Передаём isAuth и setIsAuth в NavBar, чтобы там менять кнопки */}
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} />

      <Routes>
        {/* Регистрация и Логин */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

        {/* Защищённые страницы */}
        {/* Главная страница */}
        <Route
          path="/"
          element={
            <ProtectedRoute setIsAuth={setIsAuth}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
