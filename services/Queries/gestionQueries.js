//Importamos MYsqlConnection
const db = require("../mysql");
const { removeUndefinedKeys } = require("../../utils/utils");

gestionQueries = {};

gestionQueries.getMobiliario = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM mobiliario", null, "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

gestionQueries.getRef = async (ref) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM mobiliario where referencia = ?",
      ref,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

gestionQueries.getSalaId = async (salaid) => {
  console.log(salaid);
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT id FROM salas where nombre = ?",
      salaid,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

gestionQueries.addMobiliario = async (userData, id) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.
    // Encriptamos la password con md5 y usamos la librería momentjs para registrar la fecha actual

    //Envia los parametros como un objeto
    let userObj = {
      nombre: userData.nombre,
      tipo: userData.tipo,
      referencia: userData.referencia,
      estado: userData.estado,
      salaid: id,
    }; //porque set
    return await db.query(
      "INSERT INTO mobiliario SET ?",
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

gestionQueries.getMobiliarioById = async (id) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    return await db.query(
      "SELECT salas.nombre as salasnombre,mobiliario.nombre AS mobiliarionombre,mobiliario.tipo,mobiliario.referencia,mobiliario.estado,mobiliario.id AS idmobiliario FROM mobiliario JOIN salas ON salas.id = mobiliario.salaid WHERE mobiliario.id = ?",
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

gestionQueries.updateMobiliario = async (userData, salaid, id) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      nombre: userData.nombre,
      tipo: userData.tipo,
      referencia: userData.referencia,
      estado: userData.estado,
      salaid: salaid,
    };

    userObj = await removeUndefinedKeys(userObj);

    return await db.query(
      "UPDATE mobiliario SET ? WHERE id = ?",
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

//----------------------------------------------------------------------------------------------------------------------------------------
gestionQueries.getInventario = async () => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query("SELECT * FROM inventario", null, "select", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

gestionQueries.getClienteId = async (clienteid) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT id FROM clientes where razon_social = ?",
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

gestionQueries.getRefInventario = async (ref) => {
  let conn = null;
  try {
    conn = await db.createConnection();
    return await db.query(
      "SELECT * FROM inventario where referencia = ?",
      ref,
      "select",
      conn
    );
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

gestionQueries.addInventario = async (userData, id) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.
    // Encriptamos la password con md5 y usamos la librería momentjs para registrar la fecha actual

    //Envia los parametros como un objeto
    let userObj = {
      nombre: userData.nombre,
      marca: userData.marca,
      referencia: userData.referencia,
      estado: userData.estado,
      clienteid: id,
    }; //porque set
    return await db.query(
      "INSERT INTO inventario SET ?",
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

gestionQueries.getInventarioById = async (id) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    return await db.query(
      "SELECT inventario.id ,inventario.referencia,inventario.marca,inventario.nombre,inventario.estado,clientes.razon_social FROM inventario JOIN clientes ON clientes.id = inventario.clienteid where inventario.id = ?",
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

gestionQueries.updateInventario = async (userData, clienteid, id) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      nombre: userData.nombre,
      marca: userData.marca,
      referencia: userData.referencia,
      estado: userData.estado,
      clienteid: clienteid,
    };

    userObj = await removeUndefinedKeys(userObj);

    return await db.query(
      "UPDATE inventario SET ? WHERE id = ?",
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

//--------------------------------------------------------------------------------------------------------------------------------------------

gestionQueries.getEventos = async () => {
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

gestionQueries.addEventos = async (userData, salaid, clienteid) => {
  // Conectamos con la base de datos y añadimos el usuario.
  let conn = null;
  try {
    conn = await db.createConnection();
    // Creamos un objeto con los datos del usuario a guardar en la base de datos.
    // Encriptamos la password con md5 y usamos la librería momentjs para registrar la fecha actual

    //Envia los parametros como un objeto
    let userObj = {
      nombre: userData.nombre,
      fecha_inicio: userData.fecha_inicio,
      fecha_fin: userData.fecha_fin,
      aforo: userData.aforo,
      salaid: salaid,
      clientesid: clienteid,
    }; //porque set
    return await db.query("INSERT INTO eventos SET ?", userObj, "insert", conn);
  } catch (e) {
    throw new Error(e);
  } finally {
    conn && (await conn.end());
  }
};

gestionQueries.getEventoById = async (id) => {
  let conn = null;

  try {
    conn = await db.createConnection();

    return await db.query(
      "SELECT eventos.id, eventos.nombre AS eventosnombre, eventos.fecha_inicio, eventos.fecha_fin, eventos.aforo, clientes.razon_social, salas.nombre AS salasnombre FROM eventos JOIN clientes ON clientes.id = eventos.clientesid JOIN salas ON eventos.salaid = salas.id WHERE eventos.id = ?",
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

gestionQueries.updateEvento = async (userData, clienteid, salaid, id) => {
  let conn = null;
  try {
    conn = await db.createConnection();

    let userObj = {
      nombre: userData.nombre,
      fecha_inicio: userData.fecha_inicio,
      fecha_fin: userData.fecha_fin,
      aforo: userData.aforo,
      clientesid: clienteid,
      salaid: salaid,
    };

    userObj = await removeUndefinedKeys(userObj);

    return await db.query(
      "UPDATE eventos SET ? WHERE id = ?",
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

module.exports = gestionQueries;
