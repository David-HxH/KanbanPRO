// app.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const { verificarUsuario } = require("./middlewares/auth.middleware");
const { Tablero, Lista, Tarjeta } = require("./models");

const app = express();

/* MIDDLEWARE */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* HANDLEBARS */
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));
hbs.registerHelper("eq", (a, b) => a === b);

/* RUTAS */
app.get("/", (req, res) => {
  res.render("home", { title: "Inicio" });
});

app.get("/dashboard", verificarUsuario, async (req, res) => {
  try {
    const userId = req.usuario.id;

    let tablero = await Tablero.findOne({
      where: { userId },
      include: {
        model: Lista,
        as: "listas",
        include: {
          model: Tarjeta,
          as: "tarjetas",
        },
      },
      order: [[{ model: Lista, as: "listas" }, "orden", "ASC"]],
    });

    if (!tablero) {
      const nuevoTablero = await Tablero.create({
        titulo: "Mi tablero",
        userId,
      });

      const listasBase = [
        { titulo: "Pendiente", tipo: "todo" },
        { titulo: "En progreso", tipo: "doing" },
        { titulo: "Hecho", tipo: "done" }
      ];

      await Lista.bulkCreate(
        listasBase.map((lista, index) => ({
          titulo: lista.titulo,
          tipo: lista.tipo,
          tableroId: nuevoTablero.id,
          orden: index,
        }))
      );

      tablero = await Tablero.findOne({
        where: { id: nuevoTablero.id },
        include: {
          model: Lista,
          as: "listas",
          include: {
            model: Tarjeta,
            as: "tarjetas",
          },
        },
        order: [[{ model: Lista, as: "listas" }, "orden", "ASC"]],
      });
    }

    const board = {
      name: tablero.titulo,
      lists: tablero.listas.map((lista) => ({
        id: lista.id,
        name: lista.titulo,
        tipo: lista.tipo,
        cards: lista.tarjetas.map((t) => ({
          id: t.id,
          title: t.titulo,
        })),
      })),
    };

    res.render("dashboard", {
      title: "Dashboard",
      board,
    });

  } catch (error) {
    console.error(error);
    res.send("Error cargando dashboard");
  }
});

/* API */
app.use("/api", require("./routes/api"));

module.exports = app;