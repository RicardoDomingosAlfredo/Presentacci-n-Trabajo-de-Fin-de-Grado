import express from "express";
import { listarCitas, crearCita, actualizarCita, eliminarCita } from "../controllers/citasController.js";

const router = express.Router();

router.get("/", listarCitas);
router.post("/", crearCita);
router.put("/:id", actualizarCita);
router.delete("/:id", eliminarCita);

export default router;
