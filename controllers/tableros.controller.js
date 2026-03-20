const { Tablero } = require("../models");

/* =========================
   GET tableros del usuario
========================= */
exports.getTableros = async (req, res) => {
  try {
    const tableros = await Tablero.findAll({
      where: { userId: req.usuario.id }
    });

    res.json(tableros);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo tableros" });
  }
};

/* =========================
   CREAR tablero
========================= */
exports.createTablero = async (req, res) => {
  const { titulo } = req.body;

  try {
    const nuevoTablero = await Tablero.create({
      titulo,
      userId: req.usuario.id
    });

    res.status(201).json(nuevoTablero);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando tablero" });
  }
};