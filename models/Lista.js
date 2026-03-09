const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Lista = sequelize.define("Lista", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Lista;