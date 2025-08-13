const pool = require("../db/db.js");

// Crear pedido
const createOrder = async (batch_id, customer_id, items, amount_paid_raw) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Convertir monto abonado (ej: "10.000") a número entero (ej: 10000)
    const amount_paid = parseInt(
      amount_paid_raw.toString().replace(/\./g, ""),
      10
    );

    // Convertir precios por producto
    const parsedItems = items.map((item) => {
      const unit_price = parseInt(
        item.unit_price.toString().replace(/\./g, ""),
        10
      );
      const quantity = parseInt(item.quantity, 10);
      const total_price = unit_price;
      return {
        ...item,
        unit_price,
        quantity,
        total_price,
      };
    });

    const total_amount = parsedItems.reduce(
      (sum, item) => sum + item.total_price,
      0
    );
    const commission = parsedItems.reduce(
      (sum, item) => sum + item.quantity * 5000,
      0
    );
    const total_with_commission = total_amount + commission;

    // Insertar orden
    const orderQuery = `
      INSERT INTO orders (batch_id, customer_id, total_amount, amount_paid, commission, total_with_commission)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
    `;
    const orderValues = [
      batch_id,
      customer_id,
      total_amount,
      amount_paid,
      commission,
      total_with_commission,
    ];
    const orderResult = await client.query(orderQuery, orderValues);
    const order_id = orderResult.rows[0].id;

    // Insertar items
    const orderItemQuery = `
      INSERT INTO order_items (order_id, product_name, quantity, unit_price, total_price)
      VALUES ($1, $2, $3, $4, $5);
    `;

    for (const item of parsedItems) {
      await client.query(orderItemQuery, [
        order_id,
        item.product_name,
        item.quantity,
        item.unit_price,
        item.total_price,
      ]);
    }

    // Actualizar total del lote
    /*  const updateBatchQuery = `
      UPDATE order_batches 
      SET total_cost = total_cost + $1
      WHERE id = $2;
    `;
    await client.query(updateBatchQuery, [total_with_commission, batch_id]); */

    await client.query("COMMIT");

    return {
      order_id,
      total_amount,
      total_with_commission,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Eliminar pedido
const deleteOrder = async (order_id, batch_id) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const orderQuery = `SELECT total_with_commission FROM orders WHERE id = $1`;
    const orderResult = await client.query(orderQuery, [order_id]);
    const total_with_commission = orderResult.rows[0].total_with_commission;

    await client.query(`DELETE FROM order_items WHERE order_id = $1`, [
      order_id,
    ]);
    await client.query(`DELETE FROM orders WHERE id = $1`, [order_id]);

    await client.query(
      `UPDATE order_batches SET total_cost = total_cost - $1 WHERE id = $2`,
      [total_with_commission, batch_id]
    );

    await client.query("COMMIT");
    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Obtener detalles por producto
const getOrderDetailsByBatch = async (batch_id) => {
  const query = `
    SELECT 
      o.id AS order_id,
      o.batch_id,
      ob.batch_date,
      ob.total_cost,
      c.first_name || ' ' || c.last_name AS customer_name,
      oi.product_name,
      o.total_amount,
      o.commission,
      o.amount_paid,
      o.total_with_commission,
      (o.total_with_commission - o.amount_paid) AS remaining_balance
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    JOIN order_items oi ON o.id = oi.order_id
    JOIN order_batches ob ON o.batch_id = ob.id
    WHERE o.batch_id = $1;
  `;
  const result = await pool.query(query, [batch_id]);
  return result.rows;
};

const updateOrderAmountPaidInDB = async (order_id, amount_paid_raw) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Obtener el monto abonado actual
    const result = await client.query(
      `SELECT amount_paid FROM orders WHERE id = $1`,
      [order_id]
    );
    const currentAmountPaid = parseFloat(result.rows[0].amount_paid);

    // Parsear el nuevo monto recibido del frontend
    const amount_paid_to_add = parseFloat(
      amount_paid_raw.toString().replace(/\./g, "").replace(",", ".")
    );

    // Calcular el nuevo total
    const newTotalPaid = currentAmountPaid + amount_paid_to_add;

    // Actualizar en la base de datos
    await client.query(`UPDATE orders SET amount_paid = $1 WHERE id = $2`, [
      newTotalPaid,
      order_id,
    ]);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getOrderByIdRepository = async (orderId) => {
  const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
    orderId,
  ]);
  return result.rows[0]; // Puede ser undefined si no existe
};

module.exports = {
  createOrder,
  deleteOrder,
  getOrderDetailsByBatch,
  updateOrderAmountPaidInDB,
  getOrderByIdRepository,
};
