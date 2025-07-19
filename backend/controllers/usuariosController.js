const pool = require("../config/db");
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, contrasena, rol } = req.body;
  try {
      await pool.query("SELECT registrar_usuario($1, $2, $3, $4)", [nombre, email, contrasena, rol]);
      res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  const { nombre, email, contrasena, rol } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, email, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, contrasena, rol]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contrasena, rol } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1, email = $2, contrasena = $3, rol = $4 WHERE id_usuario = $5 RETURNING *',
      [nombre, email, contrasena, rol, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




//AUTH END POINT NECESARIO PARA EL GRUPO 1

exports.getUsuarioId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT nombre FROM usuarios WHERE id_usuario = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};