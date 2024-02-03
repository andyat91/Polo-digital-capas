//importamos DAO data access object
const dao = require("../services/dao");

const getMobiliario = async (req, res) => {
  try {
    const mobiliario = await dao.getMobiliario();

    return res.send(mobiliario);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const addMobiliario = async (req, res) => {
  const { nombre, tipo, referencia, estado, salaid } = req.body;

  if (!nombre || !tipo || !referencia || !estado || !salaid)
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    //Comprueba si existe por la referencia //Reusar getRef para inventario tmb
    const mobiREF = await dao.getRef(referencia);
    // Si existe el usuario respondemos con un 409 (conflict)
    if (mobiREF.length > 0)
      return res.status(409).send({ message: `Mobiliario ya registrado` });

    const salaId = await dao.getSalaId(salaid);
    if (salaId.length < 1)
      return res
        .status(409)
        .send({ message: `Nombre de la sala no coincide con el registro` });
    console.log(salaId);

    const addMobiliario = await dao.addMobiliario(req.body, salaId[0].id);

    if (addMobiliario)
      return res.status(201).send({
        message: `Mobiliario con ref ${referencia} registrado correctamente`,
      });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const getMobiliarioById = async (req, res) => {
  const mobiliarioId = parseInt(req.params.id);

  try {
    const mobiliario = await dao.getMobiliarioById(mobiliarioId);

    return res.send(mobiliario);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const updateMobiliario = async (req, res) => {
  const { nombre, tipo, referencia, estado, salaid } = req.body;

  if (!nombre || !tipo || !referencia || !estado || !salaid)
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    const id = parseInt(req.params.id);
    const salaId = await dao.getSalaId(salaid);

    if (salaId.length < 1)
      return res
        .status(409)
        .send({ message: `Nombre de la sala no coincide con el registro` });

    const updateMobiliario = await dao.updateMobiliario(
      req.body,
      salaId[0].id,
      id
    );

    if (updateMobiliario)
      return res.send({
        message: `Mobiliario con referencia ${referencia} actualizado correctamente `,
      });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

//---------------------------------------------------------------------------------------------------------------------

const getInventario = async (req, res) => {
  try {
    const inventario = await dao.getInventario();

    return res.send(inventario);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const addInventario = async (req, res) => {
  const { nombre, marca, referencia, estado, clienteid } = req.body;

  if (!nombre || !marca || !referencia || !estado || !clienteid)
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    //Comprueba si existe por la referencia //Reusar getRef para inventario tmb
    const ref = await dao.getRefInventario(referencia);
    // Si existe el usuario respondemos con un 409 (conflict)
    if (ref.length > 0)
      return res.status(409).send({ message: `Inventario ya registrado` });

    const clienteId = await dao.getClienteId(clienteid);
    console.log(clienteid);

    const addInventario = await dao.addInventario(req.body, clienteId[0].id);

    if (addInventario)
      return res.status(201).send({
        message: `Inventario con ref ${referencia} registrado correctamente`,
      });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const getInventarioById = async (req, res) => {
  const inventarioId = parseInt(req.params.id);

  try {
    const inventario = await dao.getInventarioById(inventarioId);

    return res.send(inventario);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const updateInventario = async (req, res) => {
  const { nombre, marca, referencia, estado, idinventario, clienteid } =
    req.body;

  if (
    !nombre ||
    !marca ||
    !referencia ||
    !estado ||
    !idinventario ||
    !clienteid
  )
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    const id = parseInt(req.params.id);

    const clienteId = await dao.getClienteId(clienteid);

    if (clienteId.length < 1)
      return res
        .status(409)
        .send({ message: `Nombre de la empresa no coincide con el registro` });

    const updateInventario = await dao.updateInventario(
      req.body,
      clienteId[0].id,
      id
    );

    if (updateInventario)
      return res.send({
        message: `Inventario con referencia ${referencia} actualizado correctamente `,
      });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

//---------------------------------------------------------------------------------------------------------------------

const getEventos = async (req, res) => {
  try {
    const eventos = await dao.getEventos();

    return res.send(eventos);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const addEventos = async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin, aforo, salaid, clientesid } =
    req.body;
  console.log(req.body);

  if (
    !nombre ||
    !fecha_inicio ||
    !fecha_fin ||
    !aforo ||
    !salaid ||
    !clientesid
  )
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    const salaId = await dao.getSalaId(salaid);

    if (salaId.length < 1)
      return res
        .status(409)
        .send({ message: `Nombre de la sala no coincide con el registro` });

    const clienteId = await dao.getClienteId(clientesid);

    if (clienteId.length < 1)
      return res
        .status(409)
        .send({ message: `Nombre de la empresa no coincide con el registro` });

    const addEventos = await dao.addEventos(
      req.body,
      salaId[0].id,
      clienteId[0].id
    );

    if (addEventos)
      return res.status(201).send({
        message: `Evento registrado correctamente`,
      });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const getEventoById = async (req, res) => {
  const eventoId = parseInt(req.params.id);

  try {
    const evento = await dao.getEventoById(eventoId);
    console.log(evento);
    return res.send(evento);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const updateEvento = async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin, aforo, clientesid, salaid } =
    req.body;

  if (
    !nombre ||
    !fecha_inicio ||
    !fecha_fin ||
    !aforo ||
    !clientesid ||
    !salaid
  )
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    const id = parseInt(req.params.id);

    const clienteId = await dao.getClienteId(clientesid);

    if (clienteId.length < 1)
      return res
        .status(409)
        .send({ message: `Nombre de la empresa no coincide con el registro` });

    const salaId = await dao.getSalaId(salaid);

    if (salaId.length < 1)
      return res
        .status(409)
        .send({ message: `Nombre de la sala no coincide con el registro` });

    const updateEvento = await dao.updateEvento(
      req.body,
      clienteId[0].id,
      salaId[0].id,
      id
    );

    if (updateEvento)
      return res.send({
        message: `Evento actualizado correctamente `,
      });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

module.exports = {
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
  updateEvento,
};
