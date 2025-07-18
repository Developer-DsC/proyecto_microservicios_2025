const pool = require("../config/db");

exports.agregarAlCarrito = async(req, res) => {
    const { id_usuario, id_producto, cantidad } = req.body;
    try {
        // Verifica si los datos son válidos
        if (!id_usuario || !id_producto || !cantidad) {
            return res.status(400).json({ message: 'Faltan parámetros' });
        }

        // Realiza la llamada a la función de base de datos
        await pool.query("SELECT agregar_al_carrito($1, $2, $3)", [id_usuario, id_producto, cantidad]);

        // Responde con éxito
        res.status(201).json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        // Imprime el error en los logs para depuración
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
    }
};


exports.eliminarProductoCarrito = async(req, res) => {
    const { id_usuario, id_producto } = req.body;
    try {
        await pool.query("SELECT eliminar_producto_carrito($1, $2)", [id_usuario, id_producto]);
        res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.vaciarCarrito = async(req, res) => {
    const { p_id_usuario } = req.params;
    try {
        await pool.query("SELECT vaciar_carrito($1)", [p_id_usuario]);
        res.status(200).json({ message: "Carrito vaciado correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerCarrito = async(req, res) => {
    const { p_id_usuario } = req.params;
    try {
        const result = await pool.query("SELECT * FROM obtener_carrito($1)", [p_id_usuario]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllCarrito = async(req, res) => {
    try {
        const result = await pool.query('SELECT * FROM carrito');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCarritoById = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM carrito WHERE id_carrito = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCarrito = async(req, res) => {
    const { id_usuario, id_producto, cantidad } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *', [id_usuario, id_producto, cantidad]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCarrito = async(req, res) => {
    const { id } = req.params;
    const { id_usuario, id_producto, cantidad } = req.body;
    try {
        const result = await pool.query(
            'UPDATE carrito SET id_usuario = $1, id_producto = $2, cantidad = $3 WHERE id_carrito = $4 RETURNING *', [id_usuario, id_producto, cantidad, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCarrito = async(req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM carrito_detalles WHERE id_producto = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json({ message: 'Carrito eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.productoExisteEnCarrito = async(req, res) => {
    const { id_producto, id_usuario } = req.params; // Obtenemos el id del producto desde los parámetros de la URL// Aquí debería ir el id del usuario, obtenido de la sesión o token

    try {
        // Verificamos si el producto ya está en el carrito del usuario
        const result = await pool.query(
            'SELECT COUNT(*) FROM carrito_detalles WHERE id_producto = $1 AND id_carrito IN (SELECT id_carrito FROM carrito WHERE id_usuario = $2)', [id_producto, id_usuario]
        );

        // Verificamos si el conteo es mayor a 0, lo que significa que el producto existe en el carrito
        const existe = result.rows[0].count > 0;

        // Devolvemos `true` si el producto existe en el carrito, `false` si no
        res.json(existe);
    } catch (error) {
        console.error('Error al verificar el producto en el carrito', error);
        res.status(500).json({ message: 'Error en la base de datos' });
    }
};