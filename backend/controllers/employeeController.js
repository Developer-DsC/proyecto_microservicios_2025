const pool = require("../config/db");
// Obtener todos los empleados
exports.getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Buscar un empleado por ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params; // Usamos employee_id en la tabla
  try {
    const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]); // Ajustamos la consulta
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un empleado
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params; // Usamos employee_id en la tabla
  try {
    const result = await pool.query('DELETE FROM employees WHERE employee_id = $1', [id]); // Ajustamos la consulta
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un empleado
exports.updateEmployee = async (req, res) => {
  const { id } = req.params; // Usamos employee_id en la tabla
  const { first_name, last_name, email, job_id, salary, commission_pct, manager_id, department_id } = req.body; // Campos de la tabla

  try {
    const result = await pool.query(
      'UPDATE employees SET first_name = $1, last_name = $2, email = $3, job_id = $4, salary = $5, commission_pct = $6, manager_id = $7, department_id = $8 WHERE employee_id = $9 RETURNING *',
      [first_name, last_name, email, job_id, salary, commission_pct, manager_id, department_id, id] // Los parámetros corresponden a los campos de la tabla
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};