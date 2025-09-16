import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { listarMisNotificaciones } from "../controllers/notificacionesController.js";

const router = express.Router();

router.get("/", authMiddleware, listarMisNotificaciones);

export default router;
