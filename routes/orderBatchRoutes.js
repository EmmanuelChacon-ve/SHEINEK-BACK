const express = require("express");
const router = express.Router();
const orderBatchController = require("../controllers/orderBatchController.js");

router.post("/orderBatch", orderBatchController.createBatch);
router.get("/orderBatch", orderBatchController.getAllBatches);
router.delete("/orderBatch/:id", orderBatchController.deleteBatch);

module.exports = router;
