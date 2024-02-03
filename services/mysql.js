// Archivo de configuración de mysql
const mysql = require("mysql2");

let db = {};
// Create connection
db.createConnection = async () => {
  return new Promise((resolve, reject) => {
    try {
      const mysqlConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      mysqlConnection.connect(async function (err) {
        if (err) {
          reject(new Error(err.message));
        }
        resolve(mysqlConnection);
      });
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};

//Query asincrona (query, parametros, tipo de consulta, la conexion)
db.query = async (sqlQuery, params, type, conn) => {
  //Creamos una promesa con resolve y reject
  return new Promise((resolve, reject) => {
    //intenta
    try {
      //connectionquery con 2 parametros la query y params, dentro function async con error result
      conn.query(sqlQuery, params, async (err, result) => {
        //siNo hay error SWITCH
        if (!err) {
          //switch con el tipo de query es el type
          switch (type) {
            //caso de select
            case "select":
              resolve(JSON.parse(JSON.stringify(result)));

              break;
            //Caso de insert
            case "insert":
              resolve(parseInt(result.insertId));
              break;
            //Caso de update
            case "update":
            //Caso de replace
            case "replace":
            //Caso de delete
            case "delete":
              resolve(true);
              break;
            //SI no entra en ningun caso sacar error
            default:
              throw new Error("Query type not match");
          }
          //SI hay error;
        } else {
          console.log("Query or database error: ", err);
          reject(new Error(err.message));
        }
      });
    } catch (error) {
      reject(new Error(error.message));
    }
  });
};

module.exports = db;
