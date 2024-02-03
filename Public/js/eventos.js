window.addEventListener("load", eventos, modificarEventos);

function eventos() {
  fetch(`http://localhost:8000/gestion/eventos`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      const containerEv = document.getElementById("eventos");

      for (i = 0; i < json.length; i++) {
        containerEv.innerHTML += `<li><p>${json[i].nombre} </p><button onclick=modificarEventos(${json[i].id})>Modificar</button></li>`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function crearEventos() {
  const nombre = document.getElementById("nombre").value;
  const fechainicio = document.getElementById("fechainicio").value;
  const fechafin = document.getElementById("fechafin").value;
  const aforo = document.getElementById("aforo").value;
  const clientesid = document.getElementById("clientesid").value;
  const salaid = document.getElementById("salaid").value;

  fetch(`http://localhost:8000/gestion/eventos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      fecha_inicio: fechainicio,
      fecha_fin: fechafin,
      aforo: aforo,
      clientesid: clientesid,
      salaid: salaid,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      TregistroOK(json.message);
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//Modificar eventos------------------------------------------------------------------------------------------------------------------------------------------------
//tiene mismo url que
function modificarEventos(ideventos) {
  fetch(`http://localhost:8000/gestion/eventos/${ideventos}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      TeventoSeleccionado();

      document.getElementById("nombreModificar").value = json[0].eventosnombre;
      document.getElementById("fechainicioModificar").value =
        json[0].fecha_inicio;
      document.getElementById("fechafinModificar").value = json[0].fecha_fin;
      document.getElementById("aforoModificar").value = json[0].aforo;
      document.getElementById("clientesidModificar").value =
        json[0].razon_social;
      document.getElementById("salaidModificar").value = json[0].salasnombre;
      document.getElementById("id").value = json[0].id;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function actualizarEvento() {
  const nombre = document.getElementById("nombreModificar").value;
  const fechainicio = document.getElementById("fechainicioModificar").value;
  const fechafin = document.getElementById("fechafinModificar").value;
  const aforo = document.getElementById("aforoModificar").value;
  const clientesid = document.getElementById("clientesidModificar").value;
  const salaid = document.getElementById("salaidModificar").value;
  const id = document.getElementById("id").value;

  fetch(`http://localhost:8000/gestion/eventos/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      fecha_inicio: fechainicio,
      fecha_fin: fechafin,
      aforo: aforo,
      clientesid: clientesid,
      salaid: salaid,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      TActualizarmobiliario(json.message);
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    })
    .catch(function (error) {
      console.log(error);
    });
}
