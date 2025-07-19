const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const authenticateToken = require("../middleware/auth");

// Rutas CRUD de usuarios
router.get("/usuarios", authenticateToken, usuariosController.getAllUsuarios);
router.get("/usuarios/:id", authenticateToken, usuariosController.getUsuarioById);
router.post("/usuarios", usuariosController.createUsuario);
router.put("/usuarios/:id", authenticateToken, usuariosController.updateUsuario);
router.delete("/usuarios/:id", authenticateToken, usuariosController.deleteUsuario);

// Nueva ruta para registrar usuario usando la función de PostgreSQL
router.post("/usuarios/registro", usuariosController.registrarUsuario);


//ruta necesario para grup 1
router.get("/usuarios/id/:id",  usuariosController.getUsuarioId);

module.exports = router;
