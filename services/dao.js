const userQueries = require("../services/Queries/userQueries");
const clientesQueries = require("../services/Queries/clientesQueries");
const gestionQueries = require("../services/Queries/gestionQueries");


const dao = {};
//Aplica la logica de UserController con funcion asincrona y parametro de email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);


// Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData);

dao.clienteId = async (clienteid) => await userQueries.clienteId(clienteid);

dao.usuarioId = async (id,userData,clienteId) => await userQueries.usuarioId(id,userData,clienteId);

//Añadir suscripción 
dao.getUserByEmailsuscripcion = async (email) => await userQueries.getUserByEmailsuscripcion(email);

dao.addSuscripcion = async (email) => await userQueries.addSuscripcion(email);

//---------------------------------------------------------------------------------------------------------------------
//Mostrar carrousel en index
dao.showCarrousel = async () => await clientesQueries.showCarrousel();

//Muestra todos los clientes en clientes
dao.showClientes = async () => await clientesQueries.showClientes();

//CLientes registro y modificacion
dao.getCif = async (cif) => await clientesQueries.getCif(cif);
dao.addClient = async (userData) => await clientesQueries.addClient(userData);

//Update clientes
dao.updateClient = async (id,userData) => await clientesQueries.updateClient(id,userData);
dao.getUpdate = async (clientid) => await clientesQueries.getUpdate(clientid);

//----------------------------------------------------------------------------------------------------------------------
//MObiliario
dao.getMobiliario = async () => await gestionQueries.getMobiliario();
dao.getRef = async (ref) => await gestionQueries.getRef(ref);
dao.getSalaId = async (salaid) => await gestionQueries.getSalaId(salaid);
dao.addMobiliario = async (userData,id) => await gestionQueries.addMobiliario(userData,id);
dao.getMobiliarioById = async (id) => await gestionQueries.getMobiliarioById(id);
dao.updateMobiliario = async (userData,salaid,id) => await gestionQueries.updateMobiliario(userData,salaid,id);




//Inventario
dao.getInventario = async () => await gestionQueries.getInventario();
dao.getRefInventario = async (ref) => await gestionQueries.getRefInventario(ref);
dao.getClienteId = async (clienteid) => await gestionQueries.getClienteId(clienteid);
dao.addInventario = async (userData,id) => await gestionQueries.addInventario(userData,id);
dao.getInventarioById = async (id) => await gestionQueries.getInventarioById(id);
dao.updateInventario = async (userData,clienteid,id) => await gestionQueries.updateInventario(userData,clienteid,id);



//Eventos
dao.getEventos = async () => await gestionQueries.getEventos();
dao.addEventos = async (userData,salaid,clienteid) => await gestionQueries.addEventos(userData,salaid,clienteid);
dao.getEventoById = async (id) => await gestionQueries.getEventoById(id);
dao.updateEvento = async (userData,clienteid,salaid,id) => await gestionQueries.updateEvento(userData,clienteid,salaid,id);




module.exports = dao;