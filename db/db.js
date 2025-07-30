require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Conectado a PostgreSQL correctamente");
    client.release();
  } catch (err) {
    console.error("❌ Error al conectar a PostgreSQL:", err.message);
  }
}

checkConnection();

module.exports = pool;
