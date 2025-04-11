const { registerUser, loginUser } = require("../services/userService.js");

// Controlador para registrar un usuario
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // 1️⃣ Llamamos al servicio para registrar el usuario
    const newUser = await registerUser(first_name, last_name, email, password);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Llamamos al servicio de autenticación
    const user = await loginUser(email, password);

    // 2️⃣ Eliminamos el campo `password` antes de enviar la respuesta
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { register, login };
