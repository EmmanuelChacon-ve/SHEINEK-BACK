// src/repositories/customerRepository.js
const pool = require("../db/db.js");

// Función para crear un cliente en la base de datos
const createCustomer = async (first_name, last_name, phone, address) => {
  const query = `
    INSERT INTO customers (first_name, last_name, phone, address)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;

  const values = [first_name, last_name, phone, address];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Devuelve el cliente creado
  } catch (error) {
    throw error;
  }
};

// Función para obtener todos los clientes desde la base de datos
const getAllCustomers = async () => {
  try {
    const result = await pool.query("SELECT * FROM customers");
    return result.rows;
  } catch (error) {
    throw new Error(
      "Error al obtener los clientes desde el repositorio: " + error.message
    );
  }
};

module.exports = { createCustomer, getAllCustomers };
