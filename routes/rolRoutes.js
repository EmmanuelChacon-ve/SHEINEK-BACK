const express = require("express");
const { getRolesController } = require("../controllers/rolController.js");
const router = express.Router();

router.get("/roles", getRolesController);

module.exports = router;
