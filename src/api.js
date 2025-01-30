import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081", // ваш Go-сервер
  withCredentials: true, // обязательно, чтобы отправлять куки
});

let isRefreshing = false; // Флаг для отслеживания процесса обновления токена
let failedRequests = []; // Очередь запросов, которые нужно повторить после обновления токена

// Перехватчик для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и это не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Если токен уже обновляется, добавляем запрос в очередь
        return new Promise((resolve) => {
          failedRequests.push(() => resolve(api(originalRequest)));
        });
      }

      originalRequest._retry = true; // Помечаем запрос как повторный
      isRefreshing = true;

      try {
        // Вызываем эндпоинт для обновления токена
        const refreshResponse = await api.post("/refresh");
        const newAccessToken = refreshResponse.data.access_token;

        // Обновляем access_token в заголовках
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Повторяем все запросы из очереди
        failedRequests.forEach((callback) => callback());
        failedRequests = [];

        return api(originalRequest); // Повторяем оригинальный запрос
      } catch (refreshError) {
        // Если обновление токена не удалось, перенаправляем на страницу логина
        console.error("Ошибка при обновлении токена:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;