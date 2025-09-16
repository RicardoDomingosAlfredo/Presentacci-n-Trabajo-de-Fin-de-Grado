import pool from "../config/db.js";

export const listarUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nombre, email, telefono, rol FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error("Error listando usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(" Error eliminando usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
