import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Crear pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,       
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,   
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificar conexión
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(" Conexión a la base de datos establecida");
    connection.release();
  } catch (err) {
    console.error(" Error al conectar a la base de datos:", err.message);
  }
})();

export default pool;
