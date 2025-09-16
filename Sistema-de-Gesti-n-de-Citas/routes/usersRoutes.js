import express from "express";
import { listarUsuarios, eliminarUsuario } from "../controllers/userController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, isAdmin, listarUsuarios);
router.delete("/:id", authMiddleware, isAdmin, eliminarUsuario);

export default router;
