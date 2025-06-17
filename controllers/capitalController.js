const capitalService = require("../services/capitalService.js");

// Controlador para manejar la creación de un nuevo movimiento
const createMovement = async (req, res) => {
  try {
    const { type, amount, description } = req.body;
    const newMovement = await capitalService.createMovement({
      type,
      amount,
      description,
    });
    res.status(201).json(newMovement);
  } catch (error) {
    console.error("Error al crear movimiento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para obtener todos los movimientos del capital
const getAllMovements = async (req, res) => {
  try {
    const movements = await capitalService.getAllMovements();
    res.json(movements);
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para obtener el capital actual (saldo actual)
const getCurrentCapital = async (req, res) => {
  try {
    const currentCapital = await capitalService.getCurrentCapital();
    res.json({ currentCapital });
  } catch (error) {
    console.error("Error al obtener capital actual:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createMovement,
  getAllMovements,
  getCurrentCapital,
};
