import pool from "../config/db.js";

export const eliminarOficina = async (req, res) => {
  try {
    const { id } = req.params;

    const [funcionarios] = await pool.query(
      "SELECT id FROM funcionarios WHERE oficina_id = ?",
      [id]
    );

    if (funcionarios.length > 0) {
      return res.status(400).json({
        message: " No se puede eliminar la oficina porque tiene funcionarios asignados.",
      });
    }

    await pool.query("DELETE FROM oficinas WHERE id = ?", [id]);
    res.json({ message: " Oficina eliminada correctamente" });
  } catch (error) {
    console.error(" Error eliminando oficina:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const listarOficinas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM oficinas");
    res.json(rows);
  } catch (err) {
    console.error("Error listando oficinas:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const crearOficina = async (req, res) => {
  try {
    const { nombre, direccion, telefono, horario_apertura, horario_cierre, descripcion } = req.body;

    if (!nombre || !direccion) {
      return res.status(400).json({ message: "Nombre y dirección son obligatorios" });
    }

    await pool.query(
      "INSERT INTO oficinas (nombre, direccion, telefono, horario_apertura, horario_cierre, descripcion) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, direccion, telefono, horario_apertura || "08:00:00", horario_cierre || "17:00:00", descripcion || ""]
    );

    res.status(201).json({ message: "Oficina creada correctamente" });
  } catch (err) {
    console.error("Error creando oficina:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const actualizarOficina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, telefono, horario_apertura, horario_cierre, descripcion, activa } = req.body;

    await pool.query(
      "UPDATE oficinas SET nombre=?, direccion=?, telefono=?, horario_apertura=?, horario_cierre=?, descripcion=?, activa=? WHERE id=?",
      [nombre, direccion, telefono, horario_apertura, horario_cierre, descripcion, activa, id]
    );

    res.json({ message: "Oficina actualizada correctamente" });
  } catch (err) {
    console.error("Error actualizando oficina:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
