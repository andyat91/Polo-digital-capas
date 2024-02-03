//Importamos librería express
const express = require('express');
//Importamos libreria dotenv para utilizar .env
const dotenv = require('dotenv');
//Middleware para la generacion de registros, registra solicitudes HTTP; direccion IP,Metodo HTTP utilizado.
const userRouter = require("./routes/userRoutes");
const clientesRouter = require("./routes/clientesRoutes");
const gestionRouter = require("./routes/gestionRoutes");
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use("/user", userRouter);
app.use("/clientes", clientesRouter);
app.use("/gestion", gestionRouter);


//Levantamos el puerto 8000;
app.listen(PORT, ()=>
console.log(`Server in port ${PORT}`));