require("dotenv").config();
const { verificarConexion } = require("./config/db");
const { sequelize } = require("./config/db");
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();
const PORT = 3000;

/* =========================
   🧱 MIDDLEWARE GLOBAL
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   🎨 HANDLEBARS
========================= */
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views"));

/* =========================
   📄 RUTAS DE VISTAS
========================= */
app.get("/", (req, res) => {
  res.render("home", { title: "Inicio" });
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Registro" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// ⚠️ Dashboard ahora SIN lógica (se conectará luego a DB)
app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    board: null // luego vendrá desde DB/API
  });
});

/* =========================
   🔌 API (placeholder)
========================= */
app.use("/api", require("./routes/api")); 
// ⚠️ este archivo lo crearemos ahora

verificarConexion();
sequelize.sync({ alter: true });

/* =========================
   ▶️ SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});