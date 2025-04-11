const orderBatchService = require("../services/orderBatchService.js");

const createBatch = async (req, res) => {
  try {
    const { batch_date } = req.body;
    const batch = await orderBatchService.createBatch(batch_date);
    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBatches = async (req, res) => {
  try {
    const batches = await orderBatchService.getAllBatches();
    res.json(batches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params; // El ID se obtiene desde los parámetros de la URL
    const deletedBatch = await orderBatchService.deleteBatch(id);
    if (!deletedBatch) {
      return res.status(404).json({ error: "Fecha no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Fecha eliminada correctamente", deletedBatch });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBatch,
  getAllBatches,
  deleteBatch,
};
