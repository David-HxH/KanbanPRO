require('dotenv/config');

const { sequelize } = require('./config/db');

const Usuario = require('./models/Usuario');
const Publicacion = require('./models/Publicacion');

/* RELACIONES */

Usuario.hasMany(Publicacion);
Publicacion.belongsTo(Usuario);

async function main() {
  try {

    /* sincroniza las tablas */
    await sequelize.sync({ force: true });

    console.log("Tablas sincronizadas");

    /* crear usuario */

    const nuevoUsuario = await Usuario.create({
      nombre: "Carlos",
      email: "carlos@example.com",
    });

    /* crear publicación asociada */

    await nuevoUsuario.createPublicacion({
      titulo: "Mi primera publicación",
      contenido: "Este es el contenido de mi post, creado con Sequelize.",
    });

    /* eager loading */

    const usuarioConPublicaciones = await Usuario.findByPk(nuevoUsuario.id, {
      include: Publicacion,
    });

    console.log(JSON.stringify(usuarioConPublicaciones, null, 2));

  } catch (error) {
    console.error(error);
  }
}

main();