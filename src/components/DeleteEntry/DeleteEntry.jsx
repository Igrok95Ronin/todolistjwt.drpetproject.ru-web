import api from "../../api";

const APIURL = import.meta.env.VITE_APIURL;

// Функция для отправки PUT-запроса на сервер для обновления состояния Completed
export async function DeleteEntry(id, setLoading) {
  try {
    setLoading(true);
    // Отправка PUT-запроса с использованием axios
    const response = await api.delete(
      `/deleteentry/${id}` // URL запроса с динамическим ID
    );

    // Логируем успешный ответ от сервера
    // console.log(`Успешно обновлено: ID: ${id}, Completed: ${completed}`);
    // console.log("Ответ сервера:", response.data);
  } catch (error) {
    // Логируем ошибки в случае неудачного запроса
    console.error(`Ошибка при удалении записи ID: ${id}:`, error);
  } finally {
    setLoading(false);
  }
}
