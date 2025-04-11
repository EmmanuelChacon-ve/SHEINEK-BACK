const pool = require("../db/db.js");

// Crear una nueva fecha de compra
const createBatch = async (batch_date) => {
  const query =
    "INSERT INTO order_batches (batch_date) VALUES ($1) RETURNING *";
  const values = [batch_date];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Obtener todas las fechas de compra
const getAllBatches = async () => {
  const query = "SELECT * FROM order_batches ORDER BY batch_date DESC";
  const result = await pool.query(query);
  return result.rows;
};
const deleteBatch = async (id) => {
  const query = "DELETE FROM order_batches WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0]; // Retorna el registro eliminado (opcional)
};
module.exports = {
  createBatch,
  getAllBatches,
  deleteBatch,
};
