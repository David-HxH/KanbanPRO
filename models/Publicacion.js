const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/db');

const Publicacion = sequelize.define("Publicacion", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Publicacion;