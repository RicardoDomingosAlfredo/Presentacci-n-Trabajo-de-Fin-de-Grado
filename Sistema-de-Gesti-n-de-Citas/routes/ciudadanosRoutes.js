import express from "express";
import { authMiddleware, ensureRole } from "../middlewares/authMiddleware.js";
import { buscarCiudadano, registrarCiudadano } from "../controllers/ciudadanosController.js";

const router = express.Router();

router.get("/:term", authMiddleware, ensureRole("funcionario", "administrador"), buscarCiudadano);
router.post("/", authMiddleware, ensureRole("funcionario", "administrador"), registrarCiudadano);

export default router;
