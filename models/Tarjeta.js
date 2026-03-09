const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Tarjeta = sequelize.define("Tarjeta", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  }
});

module.exports = Tarjeta;