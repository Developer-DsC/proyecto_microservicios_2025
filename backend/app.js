const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const usuariosRoutes = require('./routes/usuariosRoutes');
const productosRoutes = require('./routes/productosRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');


const app = express();
app.use(cors());
// Middleware
app.use(express.json());
// Rutas
app.use('/api', usuariosRoutes);
app.use('/api', productosRoutes);
app.use('/api', carritoRoutes);
app.use('/api', pedidosRoutes);
app.use("/api/auth", authRoutes);
// Ruta de prueba para generar un token (en un sistema real, esto iría en un controlador de autenticación)
app.post("/login", (req, res) => {
  // Simulación de usuario
  const user = { id: 1, username: "admin" };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});
module.exports = app;
