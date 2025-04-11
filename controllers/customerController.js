// src/controllers/customerController.js
const {
  registerCustomer,
  getAllCustomersFromDB,
} = require("../services/customerService.js");

// Controlador para crear un cliente
const createCustomerController = async (req, res) => {
  const { first_name, last_name, phone, address } = req.body;

  if (!first_name || !last_name) {
    console.log("⚠️ 400 Bad Request - Nombre y apellido son obligatorios");
    return res
      .status(400)
      .json({ error: "Nombre y apellido son obligatorios" });
  }

  try {
    const newCustomer = await registerCustomer(
      first_name,
      last_name,
      phone,
      address
    );
    console.log("✅ 201 Created - Cliente creado");
    res
      .status(201)
      .json({ message: "Cliente creado exitosamente", customer: newCustomer });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para obtener todos los clientes
const getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomersFromDB();
    res.status(200).json(customers);
  } catch (error) {
    console.error("❌ Error al obtener los clientes:", error.message);
    res.status(500).json({ error: "Error interno al obtener los clientes" });
  }
};

module.exports = { createCustomerController, getAllCustomers };
