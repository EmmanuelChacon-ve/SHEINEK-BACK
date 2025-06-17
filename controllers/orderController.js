const {
  createNewOrder,
  removeOrderItem,
  getOrderDetails,
  updateOrderAmountPaid,
  getOrderByIdService,
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
    const { order_id, batch_id } = req.params;
    await removeOrderItem(order_id, batch_id); // Ya es correcto ahora

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

// Actualizar monto abonado de un pedido
const updateAmountPaid = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { amount_paid } = req.body;

    await updateOrderAmountPaid(order_id, amount_paid);

    res
      .status(200)
      .json({ message: "Monto abonado actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar monto abonado:", error);
    res.status(500).json({ message: "Error al actualizar monto abonado" });
  }
};

const getOrderById = async (req, res) => {
  const { order_id } = req.params;

  try {
    const order = await getOrderByIdService(order_id);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error al obtener el pedido por ID:", error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  deleteOrderItem,
  getOrderDetailsByBatch,
  updateAmountPaid,
  getOrderById,
};
