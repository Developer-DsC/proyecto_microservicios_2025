const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");
const authenticateToken = require("../middleware/auth");

// Rutas principales del módulo de pedidos
router.get("/pedidos", authenticateToken, pedidosController.getAllPedidos);
router.get("/pedidos/:id", authenticateToken, pedidosController.getPedidoById);
router.post("/pedidos", authenticateToken, pedidosController.createPedido);
router.delete("/pedidos/:id", authenticateToken, pedidosController.deletePedido);

// Nuevas rutas agregadas
router.post("/pedidos/realizar", authenticateToken, pedidosController.realizarCompra);
router.put("/pedidos/cambiar-estado", authenticateToken, pedidosController.cambiarEstadoPedido);
router.get("/pedidos/detalles/:p_id_pedido", authenticateToken, pedidosController.obtenerDetallesPedido);
router.get("/pedidos/historial/:p_id_usuario", authenticateToken, pedidosController.obtenerHistorialCompras);

module.exports = router;
