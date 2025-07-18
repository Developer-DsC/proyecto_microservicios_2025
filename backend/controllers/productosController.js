const pool = require("../config/db");
exports.listarProductosPorCategoria = async(req, res) => {
    const { id_categoria_p } = req.params;
    try {
        const result = await pool.query("SELECT * FROM listar_productos_por_categoria($1)", [id_categoria_p]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProductos = async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductoById = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProducto = async(req, res) => {
    const { nombre, descripcion, precio, stock, imagen, talla, marca, id_categoria } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, imagen, talla, marca, id_categoria) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [nombre, descripcion, precio, stock, imagen, talla, marca, id_categoria]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProducto = async(req, res) => {
    const { id } = req.params;
    console.log("ID recibido para actualizar:", id); // Agregar esta línea
    console.log("Datos recibidos:", req.body); // Ver qué datos está enviando Angular

    const { nombre, descripcion, precio, stock, imagen, talla, marca, id_categoria } = req.body;
    try {
        const result = await pool.query(
            'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, imagen = $5, talla = $6, marca = $7, id_categoria = $8 WHERE id_producto = $9 RETURNING *', [nombre, descripcion, precio, stock, imagen, talla, marca, id_categoria, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProducto = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM productos WHERE id_producto = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};