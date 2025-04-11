const express = require("express");
const router = express.Router();
const {
  createOrder,
  deleteOrderItem,
  getOrderDetailsByBatch,
} = require("../controllers/orderController.js");

// Ruta para crear un nuevo pedido
router.post("/orders", createOrder);

// Ruta para eliminar un producto de un pedido
router.delete("/orders/item/:order_item_id/:batch_id", deleteOrderItem);

// Ruta para obtener detalles de pedidos por lote
router.get("/orders/details/:batch_id", getOrderDetailsByBatch);

module.exports = router;
