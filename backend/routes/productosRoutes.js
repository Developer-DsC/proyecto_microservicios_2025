const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");
const authenticateToken = require("../middleware/auth");

// Rutas CRUD de productos
router.get("/productos", authenticateToken, productosController.getAllProductos);
router.get("/productos/:id", authenticateToken, productosController.getProductoById);
router.post("/productos", authenticateToken, productosController.createProducto);
router.put("/productos/:id", authenticateToken, productosController.updateProducto);
router.delete("/productos/:id", authenticateToken, productosController.deleteProducto);

// Nueva ruta para listar productos por categoría
router.get("/productos/categoria/:id_categoria_p", authenticateToken, productosController.listarProductosPorCategoria);

module.exports = router;
