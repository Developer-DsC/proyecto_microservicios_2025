const pool = require("../config/db");
exports.realizarCompra = async(req, res) => {
    const { usuario_id } = req.body;
    try {
        await pool.query("SELECT realizar_compra($1)", [usuario_id]);
        res.status(201).json({ message: "Compra realizada con éxito" });
    } catch (error) {
        console.error("Error al realizar la compra:", error);
        res.status(500).json({ message: error.message });
    }
};


exports.cambiarEstadoPedido = async(req, res) => {
    const { p_id_pedido, p_nuevo_estado } = req.body;
    try {
        await pool.query("SELECT cambiar_estado_pedido($1, $2)", [p_id_pedido, p_nuevo_estado]);
        res.status(200).json({ message: "Estado del pedido actualizado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerDetallesPedido = async(req, res) => {
    const { p_id_pedido } = req.params;
    try {
        const result = await pool.query("SELECT * FROM obtener_detalles_pedido($1)", [p_id_pedido]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerHistorialCompras = async(req, res) => {
    const { p_id_usuario } = req.params;
    try {
        const result = await pool.query("SELECT * FROM obtener_historial_compras($1)", [p_id_usuario]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPedidos = async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pedidos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPedidoById = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM pedidos WHERE id_pedido = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPedido = async(req, res) => {
    const { id_usuario, total, fecha } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pedidos (id_usuario, total, fecha_pedido) VALUES ($1, $2, $3) RETURNING *', [id_usuario, total, fecha]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePedido = async(req, res) => {
    const { id } = req.params;
    const { id_usuario, total, fecha } = req.body;
    try {
        const result = await pool.query(
            'UPDATE pedidos SET id_usuario = $1, total = $2, fecha_pedido = $3 WHERE id_pedido = $4 RETURNING *', [id_usuario, total, fecha, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePedido = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM pedidos WHERE id_pedido = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};