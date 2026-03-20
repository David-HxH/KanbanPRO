const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Tablero = sequelize.define("Tablero", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "tableros",
  timestamps: true
});

module.exports = Tablero;