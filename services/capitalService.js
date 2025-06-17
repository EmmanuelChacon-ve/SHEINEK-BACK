const db = require("../db/db.js");

// Inserta un nuevo movimiento y actualiza balance_after y capital_status
const createMovement = async ({ type, amount, description }) => {
  try {
    // Paso 1: obtener el saldo actual de capital_status
    const saldoResult = await db.query(
      "SELECT current_balance FROM capital_status ORDER BY id DESC LIMIT 1"
    );
    let currentBalance = saldoResult.rows.length
      ? parseFloat(saldoResult.rows[0].current_balance)
      : 0;

    // Paso 2: calcular el nuevo balance_after según tipo
    let newBalance;
    if (type === "entrada" || type === "Ganancia") {
      newBalance = currentBalance + parseFloat(amount);
    } else {
      // retiro, gasto u otro que disminuya saldo
      newBalance = currentBalance - parseFloat(amount);
    }

    // Paso 3: insertar el nuevo movimiento con balance_after calculado
    const insertQuery = `
      INSERT INTO capital_movements (type, amount, description, balance_after)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const result = await db.query(insertQuery, [
      type,
      amount,
      description,
      newBalance,
    ]);

    // Paso 4: actualizar capital_status con el nuevo saldo
    // Si capital_status está vacío, insertamos, sino actualizamos
    if (saldoResult.rows.length) {
      await db.query(
        "UPDATE capital_status SET current_balance = $1, last_updated = NOW() WHERE id = (SELECT id FROM capital_status ORDER BY id DESC LIMIT 1)",
        [newBalance]
      );
    } else {
      await db.query(
        "INSERT INTO capital_status (current_balance) VALUES ($1)",
        [newBalance]
      );
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllMovements = async () => {
  const result = await db.query(
    "SELECT * FROM capital_movements ORDER BY movement_date DESC"
  );
  return result.rows;
};

const getCurrentCapital = async () => {
  const result = await db.query(
    "SELECT current_balance FROM capital_status ORDER BY id DESC LIMIT 1"
  );
  return result.rows.length ? parseFloat(result.rows[0].current_balance) : 0;
};

module.exports = {
  createMovement,
  getAllMovements,
  getCurrentCapital,
};
