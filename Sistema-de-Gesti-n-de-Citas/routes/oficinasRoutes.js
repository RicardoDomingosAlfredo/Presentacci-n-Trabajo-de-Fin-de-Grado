import express from "express";
import { 
  listarOficinas, 
  crearOficina, 
  actualizarOficina, 
  eliminarOficina 
} from "../controllers/oficinasController.js";

const router = express.Router();

// GET todas las oficinas
router.get("/", listarOficinas);

// POST crear oficina
router.post("/", crearOficina);

// PUT actualizar oficina
router.put("/:id", actualizarOficina);

// DELETE eliminar oficina
router.delete("/:id", eliminarOficina);

export default router;
