//Importamos librería express
const express = require("express");

const { loginUser , addUser , addSuscripcion } = require('../controllers/userController');
//Routes sirve para modularizar y organizar rutas de manera mas efectiva, libreria express
const userRouter = express.Router();

//Exportamos rutas de controller

userRouter.post("/login", loginUser);

userRouter.post("/registro", addUser);

userRouter.post("/suscripcion", addSuscripcion);




module.exports = userRouter;
