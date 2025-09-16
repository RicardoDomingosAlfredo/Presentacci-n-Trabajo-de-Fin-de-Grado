import pool from "../config/db.js";

export const listarMisNotificaciones = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, mensaje, leida, tipo, fecha_creacion
       FROM notificaciones
       WHERE usuario_id = ?
       ORDER BY fecha_creacion DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error("listarMisNotificaciones:", err);
    res.status(500).json({ message: "Error obteniendo notificaciones" });
  }
};
