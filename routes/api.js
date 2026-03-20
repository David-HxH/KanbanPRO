const express = require("express");
const router = express.Router();

// Sub-rutas
router.use("/auth", require("./auth.routes"));
router.use("/tableros", require("./tableros.routes"));

module.exports = router;