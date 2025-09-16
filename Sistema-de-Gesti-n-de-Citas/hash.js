
import bcrypt from "bcrypt";

const contrasena = "Ricardinho01"; 
const hash = await bcrypt.hash(contrasena, 10);

console.log("Hash generado:", hash);
