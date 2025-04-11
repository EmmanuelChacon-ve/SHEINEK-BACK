const {
  createOrder,
  deleteOrderItem,
  getOrderDetailsByBatch,
} = require("../repositories/orderRepository.js");

const createNewOrder = async (batch_id, customer_id, items, amount_paid) => {
  return await createOrder(batch_id, customer_id, items, amount_paid);
};

const removeOrderItem = async (order_item_id, batch_id) => {
  return await deleteOrderItem(order_item_id, batch_id);
};

const getOrderDetails = async (batch_id) => {
  return await getOrderDetailsByBatch(batch_id);
};

module.exports = {
  createNewOrder,
  removeOrderItem,
  getOrderDetails,
};
