//importamos DAO data access object
const dao = require("../services/dao");

const showCarrousel = async (req, res) => {
  try {
    const carrousel = await dao.showCarrousel();

    return res.send(carrousel);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const showClientes = async (req, res) => {
  try {
    const clientes = await dao.showClientes();

    return res.send(clientes);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const addClient = async (req, res) => {
  const { razon_social, CIF, sector, telefono, numeroempleados } = req.body;

  if (!razon_social || !CIF || !sector || !numeroempleados || !telefono)
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    const cifId = await dao.getCif(CIF);
    
    if (cifId.length > 0)
      return res
        .status(409)
        .send({ message: `Empresa con ${CIF} ya registrada ` });

    const addClient = await dao.addClient(req.body);

    if (addClient)
      return res
        .status(201)
        .send({ message: `Empresa con cif ${CIF} registrada correctamente` });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const getUpdate = async (req, res) => {
  const clientid = parseInt(req.params.id);

  try {
    const client = await dao.getUpdate(clientid);

    return res.send(client);
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

const updateClient = async (req, res) => {
  const { razon_social, CIF, sector, telefono, numeroempleados } = req.body;

  if (!razon_social || !CIF || !sector || !numeroempleados || !telefono)
    return res.status(400).send({ message: "Error al recibir el body" });

  try {
    const clientid = parseInt(req.params.id);

    const updateClient = await dao.updateClient(clientid, req.body);

    if (updateClient)
      return res.send({ message: "Cliente actualizado con éxito" });
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};
module.exports = {
  showCarrousel,
  showClientes,
  addClient,
  updateClient,
  getUpdate,
};
