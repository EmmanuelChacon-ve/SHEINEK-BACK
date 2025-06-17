const db = require("../db/db.js");

// Inserta un nuevo movimiento de capital y actualiza el saldo
const createMovement = async ({ type, amount, description }) => {
  // Convertir a número por si viene como string
  const parsedAmount = parseFloat(amount);

  // Insertar el nuevo movimiento
  const result = await db.query(
    "INSERT INTO capital_movements (type, amount, description) VALUES ($1, $2, $3) RETURNING *",
    [type, parsedAmount, description]
  );
  const newMovement = result.rows[0];

  // Calcular nuevo saldo actual
  const capitalResult = await db.query(`
    SELECT 
      SUM(
        CASE 
          WHEN type = 'aporte' THEN amount
          WHEN type = 'inversión' THEN amount
          WHEN type = 'entrada' THEN amount
          ELSE -amount
        END
      ) AS current_capital
    FROM capital_movements
  `);
  const currentCapital = capitalResult.rows[0].current_capital || 0;

  // Verificar si ya existe un registro en capital_status
  const statusCheck = await db.query(
    "SELECT * FROM capital_status WHERE id = 1"
  );

  if (statusCheck.rows.length > 0) {
    // Si existe, actualiza
    await db.query(
      "UPDATE capital_status SET current_balance = $1, last_updated = NOW() WHERE id = 1",
      [currentCapital]
    );
  } else {
    // Si no existe, crea
    await db.query(
      "INSERT INTO capital_status (id, current_balance) VALUES (1, $1)",
      [currentCapital]
    );
  }

  return { ...newMovement, balance_after: currentCapital };
};

// Obtiene todos los movimientos registrados
const getAllMovements = async () => {
  const result = await db.query(
    "SELECT * FROM capital_movements ORDER BY movement_date DESC"
  );
  return result.rows;
};

// Devuelve el capital actual desde capital_status
const getCurrentCapital = async () => {
  const result = await db.query(
    "SELECT current_balance FROM capital_status WHERE id = 1"
  );
  return result.rows.length > 0 ? result.rows[0].current_balance : 0;
};

module.exports = {
  createMovement,
  getAllMovements,
  getCurrentCapital,
};
