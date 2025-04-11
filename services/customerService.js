// src/services/customerService.js
const {
  createCustomer,
  getAllCustomers,
} = require("../repositories/customerRepository.js");

// Función para registrar un cliente
const registerCustomer = async (first_name, last_name, phone, address) => {
  if (!first_name || !last_name) {
    throw new Error("El nombre y apellido son obligatorios");
  }

  return await createCustomer(first_name, last_name, phone, address);
};

// Función para obtener todos los clientes desde el servicio
const getAllCustomersFromDB = async () => {
  try {
    const customers = await getAllCustomers();
    return customers;
  } catch (error) {
    throw new Error(
      "Error en el servicio al obtener clientes: " + error.message
    );
  }
};

module.exports = { registerCustomer, getAllCustomersFromDB };
