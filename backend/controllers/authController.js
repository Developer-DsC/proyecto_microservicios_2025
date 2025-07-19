const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Login de usuario utilizando autenticar_usuario
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Llamamos a la función almacenada en PostgreSQL
    const result = await pool.query("SELECT * FROM autenticar_usuario($1, $2)", [username, password]);

    if (result.rows.length === 0 || !result.rows[0].autenticar_usuario) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Si la autenticación es exitosa, obtenemos el ID y nombre del usuario
    const user = result.rows[0].autenticar_usuario; // Asumiendo que devuelve un JSON con { id_usuario, nombre }

    const token = jwt.sign(
      { id: user.id_usuario, username: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" }
    );

    res.json({ token});

    console.log(user,token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

