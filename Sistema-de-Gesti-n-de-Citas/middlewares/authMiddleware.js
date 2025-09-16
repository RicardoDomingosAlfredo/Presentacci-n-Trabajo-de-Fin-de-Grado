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

export const ensureRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.rol.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ message: "Acceso denegado. Rol insuficiente." });
    }
    next();
  };
};

export const isAdmin = ensureRole("administrador");
export const isFuncionario = ensureRole("funcionario");
export const isCiudadano = ensureRole("ciudadano");
