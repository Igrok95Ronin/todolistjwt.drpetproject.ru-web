// src/api.js
import axios from "axios";

// Создаём инстанс axios с общими настройками
const api = axios.create({
  baseURL: "http://localhost:8081", // наш Go-сервер
  withCredentials: true, // обязательно, чтобы отправлять куки
});

export default api;
