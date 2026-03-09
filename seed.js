const { sequelize } = require("./config/db");

const Usuario = require("./models/Usuario");
const Tablero = require("./models/Tablero");
const Lista = require("./models/Lista");
const Tarjeta = require("./models/Tarjeta");

/* RELACIONES */

Usuario.hasMany(Tablero, { as: "tableros" });
Tablero.belongsTo(Usuario);

Tablero.hasMany(Lista, { as: "listas" });
Lista.belongsTo(Tablero);

Lista.hasMany(Tarjeta, { as: "tarjetas" });
Tarjeta.belongsTo(Lista);

async function seed() {
  try {

    await sequelize.sync({ force: true });

    console.log("Base de datos creada");

    /* USUARIOS */

    const usuario1 = await Usuario.create({
      nombre: "Carlos",
      email: "carlos@email.com"
    });

    const usuario2 = await Usuario.create({
      nombre: "Ana",
      email: "ana@email.com"
    });

    /* TABLEROS */

    const tablero1 = await Tablero.create({
      titulo: "Proyecto Backend",
      UsuarioId: usuario1.id
    });

    const tablero2 = await Tablero.create({
      titulo: "Proyecto Frontend",
      UsuarioId: usuario1.id
    });

    const tablero3 = await Tablero.create({
      titulo: "Proyecto Personal",
      UsuarioId: usuario2.id
    });

    /* LISTAS */

    const lista1 = await Lista.create({
      titulo: "Pendientes",
      TableroId: tablero1.id
    });

    const lista2 = await Lista.create({
      titulo: "En progreso",
      TableroId: tablero1.id
    });

    const lista3 = await Lista.create({
      titulo: "Completadas",
      TableroId: tablero2.id
    });

    /* TARJETAS */

    await Tarjeta.create({
      titulo: "Configurar PostgreSQL",
      descripcion: "Instalar base de datos",
      ListaId: lista1.id
    });

    await Tarjeta.create({
      titulo: "Crear modelos Sequelize",
      descripcion: "Usuario, Tablero, Lista, Tarjeta",
      ListaId: lista1.id
    });

    await Tarjeta.create({
      titulo: "Crear API REST",
      descripcion: "Endpoints CRUD",
      ListaId: lista2.id
    });

    console.log("Datos de prueba insertados");

  } catch (error) {
    console.error("Error en seed:", error);
  } finally {
    await sequelize.close();
  }
}

seed();