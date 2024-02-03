const host = "http://localhost:8000";
window.addEventListener("load", mobiliario);

//Mostrar mobiliario--------------------------------------------------------------------------------------------------------------------
function mobiliario() {
  fetch(`http://localhost:8000/gestion/mobiliario`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      const containerMob = document.getElementById("mobiliario");

      for (i = 0; i < json.length; i++) {
        containerMob.innerHTML += `<li><p>${json[i].nombre} </p><button onclick=modificarMobiliario(${json[i].id})>Modificar</button></li>`;
      }

      console.log(containerMob);
    })
    .catch(function (error) {
      console.log(error);
    });
}
//Añadir nuevo mobiliario----------------------------------------------------------------------------------------------------------------
function agregarMobiliario() {
  const nombre = document.getElementById("nombre").value;
  const tipo = document.getElementById("tipo").value;
  const referencia = document.getElementById("referencia").value;
  const estado = document.getElementById("estado").value;
  const salaid = document.getElementById("salaid").value;

  fetch(`http://localhost:8000/gestion/mobiliario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      tipo: tipo,
      referencia: referencia,
      estado: estado,
      salaid: salaid,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (json == false) {
        TRegistroSalamal();
      } else {
        TregistroOK();
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//Modificar mobiliario-------------------------------------------------------------------------------------------------------------------------
function modificarMobiliario(idmobiliario) {
  fetch(`http://localhost:8000/gestion/mobiliario/${idmobiliario}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      TModificarmobiliario(json[0].mobiliarionombre);

      document.getElementById("nombreModificar").value =
        json[0].mobiliarionombre;
      document.getElementById("tipoModificar").value = json[0].tipo;
      document.getElementById("referenciaModificar").value = json[0].referencia;
      document.getElementById("estadoModificar").value = json[0].estado;
      document.getElementById("salaidModificar").value = json[0].salasnombre;
      document.getElementById("id").value = json[0].idmobiliario;
    })
    .catch(function (error) {
      console.log(error);
    });
}
//Guardar modificaciones-------------------------------------------------------------------------------------------------------------------------------

function guardarMobiliario() {
  const nombre = document.getElementById("nombreModificar").value;
  const tipo = document.getElementById("tipoModificar").value;
  const referencia = document.getElementById("referenciaModificar").value;
  const estado = document.getElementById("estadoModificar").value;
  const salaid = document.getElementById("salaidModificar").value;
  const id = document.getElementById("id").value;

  fetch(`http://localhost:8000/gestion/mobiliario/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      tipo: tipo,
      referencia: referencia,
      estado: estado,
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
