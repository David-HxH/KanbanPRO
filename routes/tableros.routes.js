const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middlewares/auth.middleware");
const tablerosController = require("../controllers/tableros.controller");

// GET /api/tableros
router.get("/", verificarToken, tablerosController.getTableros);

// POST /api/tableros
router.post("/", verificarToken, tablerosController.createTablero);

module.exports = router;
