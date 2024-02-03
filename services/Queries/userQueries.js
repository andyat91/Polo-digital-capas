//Importamos MYsqlConnection
const db = require("../mysql");
//Libreria para guardar datos como hora fecha etc...
const moment = require("moment");
//algoritmo que se utiliza para verificar la integridad de datos
const md5 = require("md5");
const { removeUndefinedKeys } = require("../../utils/utils");

const userQueries = {};

userQueries.getUserByEmail = async (email) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  //variable conn = null
  let conn = null;
  //try catch finnally para cerrar la conexion al final
  try {
    //Creamoa la conexion a base de datos de mysql.js
    conn = await db.createConnection();
    //Devolvemos los cuatro parametros: consulta, parametro, tipo de consulta y conexion
    return await db.query(
      "select usuarios.password, empleadosclientes.nombre, empleadosclientes.apellidos from usuarios join empleadosclientes on usuarios.id = empleadosclientes.usuarioid where email = ?",
      email,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.addUser = async (userData) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      email: userData.email,
      password: userData.password,
    };
    return await db.query(
      "INSERT INTO usuarios SET ?",
      userObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.clienteId = async (clienteid) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    return await db.query(
      "select id from clientes where razon_social= ?",
      clienteid,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.usuarioId = async (id, userData, clienteid) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      nombre: userData.nombre,
      apellidos: userData.apellidos,
      usuarioid: id,
      clientesid: clienteid,
      DNI: userData.DNI,
      telefono: userData.telefono,
    };

    return await db.query(
      "INSERT INTO empleadosclientes SET ?",
      userObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.getUserByEmailsuscripcion = async (email) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    return await db.query(
      "select * from newsletter where email = ?",
      email,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.getUser = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT name FROM users", null, "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

userQueries.addSuscripcion = async (email) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      email: email,
      suscrito: 1,
    };

    return await db.query(
      "INSERT INTO newsletter SET ?",
      userObj,
      "insert",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

module.exports = userQueries;
