// routes/usersRoutes.js
import express from "express";
import { listarUsuarios, eliminarUsuario } from "../controllers/userController.js";

const router = express.Router();

// GET /api/users → lista todos los usuarios
router.get("/", listarUsuarios);

// DELETE /api/users/:id → elimina un usuario
router.delete("/:id", eliminarUsuario);

export default router;
