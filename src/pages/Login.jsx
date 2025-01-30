import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Container, TextField, Button, Typography, Paper, Alert, Box } from "@mui/material";

function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await api.post("/login", { email, password });
      console.log("Авторизация успешна:", response.data);

      // Ставим isAuth в true
      setIsAuth(true);

      // Перебрасываем на главную страницу
      navigate("/");
    } catch (error) {
      console.error("Ошибка при логине:", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Неверные логин или пароль!");
      } else {
        setErrorMessage("Ошибка сервера. Попробуйте позже.");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, mt: 6, textAlign: "center" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Пароль"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Войти
            </Button>
          </Box>
        </form>
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
