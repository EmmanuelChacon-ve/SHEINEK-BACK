const express = require("express");
const router = express.Router();
const capitalController = require("../controllers/capitalController.js");

// Ruta para crear un nuevo movimiento (entrada o salida de dinero)
router.post("/capital", capitalController.createMovement);

// Ruta para obtener todos los movimientos registrados
router.get("/capital", capitalController.getAllMovements);

// Ruta para consultar el capital actual
router.get("/capital/actual", capitalController.getCurrentCapital);

module.exports = router;
