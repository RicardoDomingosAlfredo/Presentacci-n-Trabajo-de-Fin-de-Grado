import pool from "../config/db.js";

export const buscarCiudadano = async (req, res) => {
  try {
    const { term } = req.params;
    if (!term) return res.status(400).json({ message: "Falta el término de búsqueda" });

    const [rows] = await pool.query(
      `SELECT id, nombre, apellido, nombre_usuario, email, telefono
       FROM usuarios
       WHERE rol = 'ciudadano' AND (email = ? OR nombre_usuario = ? OR nombre = ?)`,
      [term, term, term]
    );

    if (rows.length === 0) return res.status(404).json({ message: "Ciudadano no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("buscarCiudadano:", err);
    res.status(500).json({ message: "Error buscando ciudadano" });
  }
};

export const registrarCiudadano = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, contrasena } = req.body;
    if (!nombre || !apellido || !email || !contrasena) {
      return res.status(400).json({ message: "Datos obligatorios faltantes" });
    }

    await pool.query(
      `INSERT INTO usuarios (nombre, apellido, nombre_usuario, email, telefono, contrasena, rol)
       VALUES (?, ?, ?, ?, ?, ?, 'ciudadano')`,
      [nombre, apellido, email.split("@")[0], email, telefono || null, contrasena]
    );

    res.status(201).json({ message: " Ciudadano registrado" });
  } catch (err) {
    console.error("registrarCiudadano:", err);
    res.status(500).json({ message: "Error registrando ciudadano" });
  }
};
