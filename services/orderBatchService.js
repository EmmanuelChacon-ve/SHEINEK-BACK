const orderBatchRepository = require("../repositories/orderBatchRepository.js");

const createBatch = async (batch_date) => {
  if (!batch_date) {
    throw new Error("La fecha de compra es obligatoria");
  }
  return await orderBatchRepository.createBatch(batch_date);
};

const getAllBatches = async () => {
  return await orderBatchRepository.getAllBatches();
};

const deleteBatch = async (id) => {
  if (!id) {
    throw new Error("El ID de la fecha es obligatorio");
  }
  return await orderBatchRepository.deleteBatch(id);
};
const updateTotalCost = async (id, total_cost) => {
  if (!id || total_cost === undefined || isNaN(total_cost)) {
    throw new Error("ID y total_cost válidos son obligatorios");
  }
  return await orderBatchRepository.updateTotalCost(id, total_cost);
};

module.exports = {
  createBatch,
  getAllBatches,
  deleteBatch,
  updateTotalCost,
};
