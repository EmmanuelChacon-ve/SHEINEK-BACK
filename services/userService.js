const bcrypt = require("bcryptjs");
const {
  createUser,
  getUserByEmail,
} = require("../repositories/userRepository.js");

// Función para registrar un nuevo usuario
const registerUser = async (first_name, last_name, email, password) => {
  // 1️⃣ Verificamos si el usuario ya existe
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("El correo ya está registrado");
  }

  // 2️⃣ Hasheamos la contraseña antes de guardarla en la BD
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ Creamos el usuario en la base de datos
  const newUser = await createUser(
    first_name,
    last_name,
    email,
    hashedPassword
  );
  return newUser; // Retornamos el usuario recién creado
};

// Función para autenticar un usuario por email y contraseña
const loginUser = async (email, password) => {
  // 1️⃣ Buscamos al usuario en la BD
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Correo o contraseña incorrectos");
  }

  // 2️⃣ Verificamos si la contraseña es correcta
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return user; // Retornamos la información del usuario autenticado
};

module.exports = { registerUser, loginUser };
