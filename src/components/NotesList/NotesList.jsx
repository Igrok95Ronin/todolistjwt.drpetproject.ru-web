import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import api from "../../api";

export default function NotesList({ loading, setLoading }) {
  // Состояние для хранения списка заметок
  const [notes, setNotes] = React.useState([]);
  const [error, setError] = React.useState(null);

  // Получение данных при загрузке компонента
  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Выполнение GET-запроса
        const response = await api.get("/");
        setNotes(response.data); // Установка данных в состояние
        setLoading(false); // Отключение индикатора загрузки
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
        setError("Ошибка при загрузке заметок");
        setLoading(false);
      }
    };

    fetchNotes();
  }, [loading]); // Пустой массив зависимостей, чтобы запрос выполнялся только при первой загрузке

  return (
    <Box sx={{ marginTop: "20px", padding: "20px", overflow: "auto", height: "250px", padding: 0 }}>
      {loading && <Typography>Загрузка...</Typography>}

      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <ul style={{padding: 0}}>
          {notes.map((note) => (
            <li key={note.ID}>
              <Typography variant="body1">{note.Note}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}
