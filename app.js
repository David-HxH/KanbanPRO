require('dotenv/config');
const { pool, verificarConexion } = require('./config/db');

verificarConexion();

// INSERTAR
async function insertarTarea(titulo, descripcion) {
  try {
    const consulta = 'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2)';
    const valores = [titulo, descripcion];

    const resultado = await pool.query(consulta, valores);

    console.log(
      `Tarea "${titulo}" insertada con éxito. Filas afectadas: ${resultado.rowCount}`
    );
  } catch (error) {
    console.error('Error al insertar tarea:', error.message);
  }
}

// ACTUALIZAR
async function actualizarTarea(id, nuevoTitulo, nuevaDescripcion) {
  try {
    const consulta =
      'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3';
    const valores = [nuevoTitulo, nuevaDescripcion, id];

    const resultado = await pool.query(consulta, valores);

    if (resultado.rowCount === 0) {
      console.log(`No existe una tarea con ID ${id}.`);
    } else {
      console.log(
        `Tarea con ID ${id} actualizada. Filas afectadas: ${resultado.rowCount}`
      );
    }
  } catch (error) {
    console.error('Error al actualizar tarea:', error.message);
  }
}

// ELIMINAR
async function eliminarTarea(id) {
  try {
    const consulta = 'DELETE FROM tareas WHERE id = $1';
    const valores = [id];

    const resultado = await pool.query(consulta, valores);

    if (resultado.rowCount === 0) {
      console.log(`No existe una tarea con ID ${id}.`);
    } else {
      console.log(
        `Tarea con ID ${id} eliminada. Filas afectadas: ${resultado.rowCount}`
      );
    }
  } catch (error) {
    console.error('Error al eliminar tarea:', error.message);
  }
}

// FUNCIÓN PRINCIPAL DE PRUEBA
async function main() {
  try {
    await insertarTarea('Nueva Tarea', 'Descripción de la nueva tarea.');
    await actualizarTarea(
      1,
      'Aprender PostgreSQL',
      'Completar todos los ejercicios de la guía de base de datos.'
    );
    await eliminarTarea(2); // Ajusta el ID según lo que exista
  } catch (error) {
    console.error('Error en la ejecución principal:', error.message);
  } finally {
    await pool.end(); // cerrar conexión
  }
}

main();