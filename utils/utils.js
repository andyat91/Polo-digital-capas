const { jwtVerify } = require("jose");

const removeUndefinedKeys = async (obj) => {
  try {
    // Itera sobre todas las claves del objeto
    Object.keys(obj).forEach((key) => {
      // Si el valor de la clave es "-1" o -1, se asigna null a esa clave
      if (obj[key] === "-1" || obj[key] === -1) {
        obj[key] = null;
        // Si el valor de la clave es undefined o una cadena vacía, elimina la clave del objeto
      } else if (obj[key] === undefined || obj[key] === "") {
        delete obj[key];
      }
    });

    return obj;
  } catch (error) {
    throw new Error(error.message);
  }
};

const veryfyToken = async (authorizacion) => {
  try {
    const token = authorizacion.split(" ")[1];

    const encoder = new TextEncoder();

    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );
    return payload;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { removeUndefinedKeys, veryfyToken };
