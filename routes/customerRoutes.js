// src/routes/customerRoutes.js
const express = require("express");
const {
  createCustomerController,
  getAllCustomers,
} = require("../controllers/customerController.js");

const router = express.Router();

// Ruta para crear un cliente
router.post("/customers", createCustomerController);

// Ruta para obtener todos los clientes
router.get("/customers", getAllCustomers);

module.exports = router;
