//importamos DAO data access object
const dao = require("../services/dao");
const { SignJWT, jwtVerify } = require("jose");
const md5 = require("md5");

// Controlador para el login de un usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Si no alguno de estos campos recibidos por el body devolvemos un 400 (bad request)
  if (!email || !password)
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    let user = await dao.getUserByEmail(email);
    // Si no existe el usuario respondemos con un 404 (not found)
    if (user.length <= 0)
      return res.status(404).send({ message: "Email incorrecto" });
    // Pasamos md5 a la paswword recibida del cliente
    // const clienPassword = md5(password);
    // Como la consulta a la base de datos nos devuelve un array con el objeto del usuario usamos la desestructuración.
    [user] = user;
    // Si existe el usuario, comprobamos que la password es correcta. Si no lo es devolvemos un 401 (unathorized)
    if (user.password != password)
      return res.status(401).send({ message: "Password incorrecta" });

    // Si es correcta generamos el token y lo devolvemos al cliente
    // Construimos el JWT con el id, email y rol del usuario
    // const jwtConstructor = new SignJWT({ id: user.id, email, role: user.userRole });
    //jWT
    // // Codificamos la clave secreta definida en la variable de entorno por requisito de la librería jose
    // // y poder pasarla en el formato correcto (uint8Array) en el método .sign
    // const encoder = new TextEncoder();
    // // Generamos el JWT. Lo hacemos asíncrono, ya que nos devuelve una promesa.
    // // Le indicamos la cabecera, la creación, la expiración y la firma (clave secreta).
    // const jwt = await jwtConstructor
    //   .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    //   .setIssuedAt()
    //   .setExpirationTime("1h")
    //   .sign(encoder.encode(process.env.JWT_SECRET));
    //Si todo es correcto enviamos la respuesta. 200 OK

    return res.send(user);
  } catch (e) {
    console.log(e.message);
  }
};

const addUser = async (req, res) => {
  const { nombre, email, password, apellidos, DNI, telefono, clientesid } =
    req.body;

  if (
    !nombre ||
    !email ||
    !password ||
    !apellidos ||
    !DNI ||
    !telefono ||
    !clientesid
  )
    return res.status(400).send({ message: "Error al recibir el body" });
  // Buscamos el usuario en la base de datos
  try {
    const user = await dao.getUserByEmail(email);
    // Si existe el usuario respondemos con un 409 (conflict)
    if (user.length > 0)
      return res
        .status(409)
        .send({ message: `Usuario con email ${email} ya registrado ` });
    // Si no existe lo registramos
    const addUser = await dao.addUser(req.body);
    const clienteId = await dao.clienteId(clientesid);
    console.log(clienteId[0].id);
    const usuarioId = await dao.usuarioId(addUser, req.body, clienteId[0].id);

    if (usuarioId)
      return res.status(201).send({ message: `Usuario registrado con éxito` });
  } catch (e) {
    console.log(e.message);
    //Throw sirve para lanzar error inesperado, se puede señalar explicitamente que algo inusual ha sucedido
    throw new Error(e);
  }
};

const addSuscripcion = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    const user = await dao.getUserByEmailsuscripcion(email);

    if (user.length > 0)
      return res
        .status(409)
        .send({ message: `Usuario con email ${email} ya registrado ` });

    const addSuscripcion = await dao.addSuscripcion(email);

    if (addSuscripcion)
      return res.status(201).send({ message: `Usuario registrado con éxito` });
  } catch (error) {
    console.log(error);

    throw new Error(e);
  }
};
module.exports = { loginUser, addUser, addSuscripcion };
