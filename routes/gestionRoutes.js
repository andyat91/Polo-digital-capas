//Importamos librería express
const express = require("express");

const {
  getMobiliario,
  getInventario,
  addMobiliario,
  addInventario,
  getMobiliarioById,
  getInventarioById,
  updateMobiliario,
  updateInventario,
  getEventos,
  addEventos,
  getEventoById,
  updateEvento
} = require("../controllers/gestionController");
//Routes sirve para modularizar y organizar rutas de manera mas efectiva, libreria express
const gestionRouter = express.Router();

//Mobiliario
gestionRouter.get("/mobiliario", getMobiliario);
gestionRouter.post("/mobiliario", addMobiliario);
gestionRouter.get("/mobiliario/:id", getMobiliarioById);
gestionRouter.post("/mobiliario/:id", updateMobiliario);

//Inventario
gestionRouter.get("/inventario", getInventario);
gestionRouter.post("/inventario", addInventario);
gestionRouter.get("/inventario/:id", getInventarioById);
gestionRouter.post("/inventario/:id", updateInventario);

//Eventos
gestionRouter.get("/eventos", getEventos);
gestionRouter.post("/eventos",addEventos);
gestionRouter.get("/eventos/:id",getEventoById);
gestionRouter.post("/eventos/:id",updateEvento);

module.exports = gestionRouter;
