//Importamos MYsqlConnection
const db = require("../mysql");
const { removeUndefinedKeys } = require("../../utils/utils");

clientesQueries = {};

clientesQueries.showCarrousel = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM eventos", null, "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

clientesQueries.showClientes = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM clientes", null, "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

clientesQueries.getCif = async (cif) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  //variable conn = null
  let conn = null;
  //try catch finnally para cerrar la conexion al final
  try {
    //Creamoa la conexion a base de datos de mysql.js
    conn = await db.createConnection();
    //Devolvemos los cuatro parametros: consulta, parametro, tipo de consulta y conexion
    return await db.query(
      "SELECT * FROM clientes WHERE CIF = ?",
      cif,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

clientesQueries.addClient = async (userData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.
    // Encriptamos la password con md5 y usamos la librería momentjs para registrar la fecha actual

    //Envia los parametros como un objeto
    let userObj = {
      razon_social: userData.razon_social,
      CIF: userData.CIF,
      sector: userData.sector,
      telefono: userData.telefono,
      numero_empleados: userData.numeroempleados,
    }; //porque set
    return await db.query(
      "INSERT INTO clientes SET ?",
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

clientesQueries.getUpdate = async (id) => {
  // Conectamos con la base de datos y buscamos si existe el usuario por el email.
  //variable conn = null
  let conn = null;
  //try catch finnally para cerrar la conexion al final
  try {
    //Creamoa la conexion a base de datos de mysql.js
    conn = await db.createConnection();
    //Devolvemos los cuatro parametros: consulta, parametro, tipo de consulta y conexion
    return await db.query(
      "SELECT * FROM clientes WHERE id = ?",
      id,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

clientesQueries.updateClient = async (id, userData) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos que nos puede llegar del usuario a modificar en la base de datos.
    // Encriptamos la password con md5 si nos llega por el body, sino la declaramos como undefined
    // y usamos la libreria momentjs para actualizar la fecha.
    let userObj = {
      razon_social: userData.razon_social,
      CIF: userData.CIF,
      sector: userData.sector,
      telefono: userData.telefono,
      numero_empleados: userData.numeroempleados,
    };
    // Eliminamos los campos que no se van a modificar (no llegan por el body)
    userObj = await removeUndefinedKeys(userObj);

    return await db.query(
      "UPDATE clientes SET ? WHERE id = ?",
      [userObj, id],
      "update",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

module.exports = clientesQueries;
