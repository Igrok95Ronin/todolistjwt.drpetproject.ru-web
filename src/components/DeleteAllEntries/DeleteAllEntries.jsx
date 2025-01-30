import api from "../../api";

export async function DeleteAllEntries(setLoading) {
  try {
    setLoading(true);
    await api.delete("/deleteallentries");
  } catch (error) {
    console.error(`Ошибка при удалении всех записей:`, error);
  } finally {
    setLoading(false);
  }
}
