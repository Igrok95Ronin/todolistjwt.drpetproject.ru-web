import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../../api";

import "./BasicTextFields.scss";

export default function BasicTextFields({ setLoading }) {
  // Состояние для хранения значения из поля ввода
  const [note, setNote] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем длину текста из состояния note
    if (note.length < 3) {
      setError(true);
      setHelperText("Минимум 3 символа");
      setTimeout(() => {
        setHelperText("");
      }, 5000);
      return; // Прекращаем выполнение, если текст слишком короткий
    } else if (note.length > 100) {
      setError(true);
      setHelperText("Максимум 100 символов");
      setTimeout(() => {
        setHelperText("");
      }, 5000);
      return; // Прекращаем выполнение, если текст слишком длинный
    } else {
      setError(false);
      setHelperText(""); // Очищаем сообщение об ошибке
    }

    const payload = {
      note: note,
    };

    try {
      setLoading(true);
      await api.post("/addpost", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //   alert("Данные успешно отправлены!");
      setNote("");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при отправке данных.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", gap: "10px", marginTop: "10px" }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        id="fullWidth"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="basicTextFields__input"
        error={error} // Показываем ошибку
        helperText={helperText} // Отображаем сообщение
      />
      <Button sx={{ backgroundColor: "#499cc1", minWidth: "50px" }} variant="contained" type="submit">
        +
      </Button>
    </Box>
  );
}
