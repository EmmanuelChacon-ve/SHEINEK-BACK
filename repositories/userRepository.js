const pool = require("../db/db.js");

// Función para crear un usuario en la base de datos
const createUser = async (first_name, last_name, email, password) => {
  const client = await pool.connect(); // 1️⃣ Obtiene una conexión a la BD

  try {
    await client.query("BEGIN"); // 2️⃣ Inicia una transacción

    // 3️⃣ Insertamos el usuario en la tabla `users`
    const userQuery = `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email;
    `;
    const userValues = [first_name, last_name, email, password];
    const userResult = await client.query(userQuery, userValues);
    const newUser = userResult.rows[0]; // Obtenemos el usuario recién creado

    // 4️⃣ Asignamos el rol por defecto (Empleado = 1) en `user_has_role`
    const roleQuery = `INSERT INTO user_has_role (user_id, role_id) VALUES ($1, 1);`;
    await client.query(roleQuery, [newUser.id]); // Relacionamos el usuario con el rol

    await client.query("COMMIT"); // 5️⃣ Guardamos los cambios si todo fue exitoso
    return newUser;
  } catch (error) {
    await client.query("ROLLBACK"); // 6️⃣ Revertimos la transacción si hay error
    throw error;
  } finally {
    client.release(); // 7️⃣ Liberamos la conexión a la BD
  }
};

// Función para obtener un usuario por su email
const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1;";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna el usuario si existe
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, getUserByEmail };
