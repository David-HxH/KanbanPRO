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

async function testCRUD() {
  try {

    console.log("=== INICIO TEST CRUD ===");

    await sequelize.sync();

    /* CREAR */

    console.log("📌 CREAR tarjeta");

    const lista = await Lista.findByPk(1);

    if (!lista) {
      console.log("No existe la lista con id 1");
      return;
    }

    const tarjeta = await Tarjeta.create({
      titulo: "Nueva tarjeta",
      descripcion: "Creada desde test-crud",
      ListaId: lista.id
    });

    console.log("Tarjeta creada:", tarjeta.titulo);

    /* LEER */

    console.log("📌 LEER tablero con listas y tarjetas");

    const tablero = await Tablero.findByPk(1, {
      include: {
        model: Lista,
        as: "listas",
        include: {
          model: Tarjeta,
          as: "tarjetas"
        }
      }
    });

    if (tablero) {
      console.log(JSON.stringify(tablero.toJSON(), null, 2));
    } else {
      console.log("No se encontró el tablero con id 1");
    }

    /* ACTUALIZAR */

    console.log("📌 ACTUALIZAR tarjeta");

    tarjeta.titulo = "Tarjeta actualizada";
    await tarjeta.save();

    console.log("Tarjeta actualizada");

    /* BORRAR */

    console.log("📌 BORRAR tarjeta");

    await tarjeta.destroy();

    console.log("Tarjeta eliminada");

    console.log("=== FIN TEST CRUD ===");

  } catch (error) {
    console.error("Error en test CRUD:", error);
  } finally {
    await sequelize.close();
  }
}

testCRUD();