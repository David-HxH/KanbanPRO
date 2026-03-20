const User = require("./User");
const Tablero = require("./Tablero");

// Relaciones
User.hasMany(Tablero, {
  foreignKey: "userId",
  as: "tableros"
});

Tablero.belongsTo(User, {
  foreignKey: "userId",
  as: "usuario"
});

module.exports = {
  User,
  Tablero
};