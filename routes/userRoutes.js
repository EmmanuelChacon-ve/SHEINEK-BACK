const express = require("express");
const { register, login } = require("../controllers/userController.js");

const router = express.Router();

router.post("/users", register);
// Ruta para iniciar sesión
router.post("/login", login);

module.exports = router;
