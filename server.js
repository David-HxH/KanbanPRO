const app = require("./app");
const { verificarConexion, sequelize } = require("./config/db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await verificarConexion();

    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error iniciando servidor:", error);
  }
})();