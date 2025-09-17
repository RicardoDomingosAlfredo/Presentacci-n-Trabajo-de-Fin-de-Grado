import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import citasRoutes from "./routes/citasRoutes.js";
import ciudadanosRoutes from "./routes/ciudadanosRoutes.js";
import oficinasRoutes from "./routes/oficinasRoutes.js";
import notificacionesRoutes from "./routes/notificacionesRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS configurado
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/ciudadanos", ciudadanosRoutes);
app.use("/api/oficinas", oficinasRoutes);
app.use("/api/notificaciones", notificacionesRoutes);

//  Endpoint de salud (útil en Render)
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
