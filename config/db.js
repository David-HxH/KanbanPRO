const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "postgres",
  logging: false
});

async function verificarConexion() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a postgres exitosa");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

module.exports = { sequelize, verificarConexion };