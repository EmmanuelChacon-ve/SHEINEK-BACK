const express = require("express");
const router = express.Router();
const {
  createOrder,
  deleteOrderItem,
  getOrderDetailsByBatch,
  updateAmountPaid,
  getOrderById,
} = require("../controllers/orderController.js");

// Ruta para crear un nuevo pedido
router.post("/orders", createOrder);

// Ruta para eliminar un producto de un pedido
router.delete("/orders/:order_id/:batch_id", deleteOrderItem); // Cambia a order_id

// Ruta para obtener detalles de pedidos por lote
router.get("/orders/details/:batch_id", getOrderDetailsByBatch);
router.put("/orders/:order_id/amount-paid", updateAmountPaid);
router.get("/orders/:order_id", getOrderById);

module.exports = router;
