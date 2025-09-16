import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";


export const register = async (req, res) => {
  try {
    console.log(" Datos recibidos en backend:", req.body);

    const nombre = req.body.nombre || req.body.name;
    const apellido = req.body.apellido || "";
    const nombre_usuario = req.body.nombre_usuario || req.body.username;
    const email = req.body.email;
    const telefono = req.body.telefono || req.body.phone;
    const contrasena = req.body.contrasena || req.body.password;
    const rol = req.body.rol || req.body.role || "ciudadano";

    if (!contrasena) {
      return res.status(400).json({ message: " La contraseña no fue enviada" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ? OR nombre_usuario = ?",
      [email, nombre_usuario]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: " El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, nombre_usuario, email, contrasena, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, nombre_usuario, email, hashedPassword, telefono, rol]
    );

    res.status(201).json({ message: " Usuario registrado exitosamente" });
  } catch (error) {
    console.error(" Error registrando usuario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: " Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        nombre_usuario: usuario.nombre_usuario,
        email: usuario.email,
        telefono: usuario.telefono,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error(" Error iniciando sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


export const perfil = async (req, res) => {
  try {
    const usuarioId = req.user.id;

    const [rows] = await pool.query(
      "SELECT id, nombre, apellido, nombre_usuario, email, telefono, rol FROM usuarios WHERE id = ?",
      [usuarioId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
