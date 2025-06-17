const {
  createOrder,
  deleteOrder,
  getOrderDetailsByBatch,
  updateOrderAmountPaidInDB,
  getOrderByIdRepository,
} = require("../repositories/orderRepository.js");

const createNewOrder = async (batch_id, customer_id, items, amount_paid) => {
  return await createOrder(batch_id, customer_id, items, amount_paid);
};

const removeOrderItem = async (order_item_id, batch_id) => {
  return await deleteOrder(order_item_id, batch_id);
};

const getOrderDetails = async (batch_id) => {
  return await getOrderDetailsByBatch(batch_id);
};

const updateOrderAmountPaid = async (order_id, amount_paid) => {
  return await updateOrderAmountPaidInDB(order_id, amount_paid);
};
const getOrderByIdService = async (orderId) => {
  const order = await getOrderByIdRepository(orderId);

  if (!order) {
    const error = new Error("Pedido no encontrado");
    error.status = 404;
    throw error;
  }

  return order;
};
module.exports = {
  createNewOrder,
  removeOrderItem,
  getOrderDetails,
  updateOrderAmountPaid,
  getOrderByIdService,
};
