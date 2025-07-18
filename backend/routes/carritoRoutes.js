const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");
const authenticateToken = require("../middleware/auth");

// Rutas de carrito
router.get("/carrito", authenticateToken, carritoController.getAllCarrito);
router.get("/carrito/:id", authenticateToken, carritoController.getCarritoById);
router.post("/carrito", authenticateToken, carritoController.createCarrito);
router.put("/carrito/:id", authenticateToken, carritoController.updateCarrito);
router.delete("/carrito/:id", authenticateToken, carritoController.deleteCarrito);

// Nuevas rutas agregadas
router.post("/carrito/agregar", authenticateToken, carritoController.agregarAlCarrito);
router.delete("/carrito/eliminar", authenticateToken, carritoController.eliminarProductoCarrito);
router.delete("/carrito/vaciar/:p_id_usuario", authenticateToken, carritoController.vaciarCarrito);
router.get("/carrito/usuario/:p_id_usuario", authenticateToken, carritoController.obtenerCarrito);
// Ruta para verificar si un producto ya está en el carrito
router.get('/carrito/producto-existe/:id_producto/:id_usuario', authenticateToken, carritoController.productoExisteEnCarrito);

module.exports = router;
