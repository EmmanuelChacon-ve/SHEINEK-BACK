const pool = require("../db/db.js");
const getRolAll = async (id, name) => {
  const query = "SELECT * FROM roles";
  try {
    const result = await pool.query(query); // Ejecutar la consulta
    return result.rows; // Retornar los roles obtenidos
  } catch (error) {
    console.error("❌ Error al obtener los roles:", error);
    throw error; // Propagar el error para manejarlo en el servicio o controlador
  }
};
module.exports = { getRolAll };
