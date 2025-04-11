require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./db/db.js"); // Importar la conexión a PostgreSQL

const userRoutes = require("./routes/userRoutes.js");
const rolRoutes = require("./routes/rolRoutes.js");
const customersRoutes = require("./routes/customerRoutes.js");
const orderBatchRoutes = require("./routes/orderBatchRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Rutas
app.use("/api", [
  userRoutes,
  rolRoutes,
  customersRoutes,
  orderBatchRoutes,
  orderRoutes,
]);

app.get("/", (req, res) => {
  res.send("🚀 API de Shein funcionando correctamente");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
