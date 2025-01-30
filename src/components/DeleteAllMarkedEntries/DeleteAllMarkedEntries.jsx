import api from "../../api";

export async function DeleteAllMarkedEntries(setLoading) {
  try {
    setLoading(true);
    await api.delete("/deleteallmarkedentries");
  } catch (error) {
    console.error(`Ошибка при удалении всех отмеченных записей:`, error);
  } finally {
    setLoading(false);
  }
}
