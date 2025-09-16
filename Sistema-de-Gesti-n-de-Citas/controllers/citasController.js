import pool from "../config/db.js";

export const listarCitas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM citas");
    res.json(rows);
  } catch (err) {
    console.error(" Error listando citas:", err);
    res.status(500).json({ message: "Error obteniendo citas" });
  }
};

export const crearCita = async (req, res) => {
  try {
    const { usuario_id, funcionario_id, servicio_id, oficina_id, fecha_hora } = req.body;
    await pool.query(
      "INSERT INTO citas (usuario_id, funcionario_id, servicio_id, oficina_id, fecha_hora) VALUES (?, ?, ?, ?, ?)",
      [usuario_id, funcionario_id, servicio_id, oficina_id, fecha_hora]
    );
    res.json({ message: " Cita creada correctamente" });
  } catch (err) {
    console.error(" Error creando cita:", err);
    res.status(500).json({ message: "Error creando cita" });
  }
};

export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notas } = req.body;
    await pool.query(
      "UPDATE citas SET estado = ?, notas = ? WHERE id = ?",
      [estado, notas, id]
    );
    res.json({ message: " Cita actualizada correctamente" });
  } catch (err) {
    console.error(" Error actualizando cita:", err);
    res.status(500).json({ message: "Error actualizando cita" });
  }
};

export const eliminarCita = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM citas WHERE id = ?", [id]);
    res.json({ message: " Cita eliminada correctamente" });
  } catch (err) {
    console.error(" Error eliminando cita:", err);
    res.status(500).json({ message: "Error eliminando cita" });
  }
};
