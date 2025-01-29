import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function NavBar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setIsAuth(false);
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при логауте:", err);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} /> {/* Раздвигаем содержимое вправо */}

        {!isAuth ? (
          <>
            <Button color="inherit" component={Link} to="/register">
              Регистрация
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Вход
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Имя пользователя
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
