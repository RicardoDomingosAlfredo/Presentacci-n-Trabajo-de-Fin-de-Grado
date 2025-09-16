import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; 
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token requerido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.rol?.toLowerCase() !== "administrador") {
    return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  }
  next();
};

export const isFuncionario = (req, res, next) => {
  if (req.user?.rol?.toLowerCase() !== "funcionario") {
    return res.status(403).json({ message: "Acceso denegado. Solo funcionarios." });
  }
  next();
};

export const isCiudadano = (req, res, next) => {
  if (req.user?.rol?.toLowerCase() !== "ciudadano") {
    return res.status(403).json({ message: "Acceso denegado. Solo ciudadanos." });
  }
  next();
};
