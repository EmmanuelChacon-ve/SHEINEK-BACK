const {
  createNewOrder,
  removeOrderItem,
  getOrderDetails,
} = require("../services/orderService.js");

// Crear un nuevo pedido
const createOrder = async (req, res) => {
  try {
    const { batch_id, customer_id, items, amount_paid } = req.body;
    const order = await createNewOrder(
      batch_id,
      customer_id,
      items,
      amount_paid
    );
    res.status(201).json(order);
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ message: "Error al crear pedido" });
  }
};

// Eliminar un producto de un pedido
const deleteOrderItem = async (req, res) => {
  try {
    const { order_item_id, batch_id } = req.params;
    await removeOrderItem(order_item_id, batch_id);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

// Obtener detalles de pedidos por lote
const getOrderDetailsByBatch = async (req, res) => {
  try {
    const { batch_id } = req.params;
    const details = await getOrderDetails(batch_id);
    res.status(200).json(details);
  } catch (error) {
    console.error("Error al obtener detalles de pedidos:", error);
    res.status(500).json({ message: "Error al obtener detalles de pedidos" });
  }
};

module.exports = {
  createOrder,
  deleteOrderItem,
  getOrderDetailsByBatch,
};
