window.addEventListener("load", inventario, modificarInventario);

function inventario() {
  fetch(`http://localhost:8000/gestion/inventario`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      const containerInv = document.getElementById("inventario");

      for (i = 0; i < json.length; i++) {
        containerInv.innerHTML += `<li><p>${json[i].nombre} </p><button onclick=modificarInventario(${json[i].id})>Modificar</button></li>`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function agregarInventario() {
  const nombre = document.getElementById("nombre").value;
  const referencia = document.getElementById("referencia").value;
  const estado = document.getElementById("estado").value;
  const marca = document.getElementById("marca").value;
  const clienteid = document.getElementById("clienteid").value;

  fetch(`http://localhost:8000/gestion/inventario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      referencia: referencia,
      estado: estado,
      marca: marca,
      clienteid: clienteid,
    }),
  })
    .then(function (response) {
      response.json();
    })
    .then(function (json) {
      TregistroOK();
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    })
    .catch(function (error) {
      return error;
    });
}

function modificarInventario(id) {
  fetch(`http://localhost:8000/gestion/inventario/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      TModificarmobiliario(json[0].nombre);

      document.getElementById("nombreModificar").value = json[0].nombre;
      document.getElementById("referenciaModificar").value = json[0].referencia;
      document.getElementById("estadoModificar").value = json[0].estado;
      document.getElementById("marcaModificar").value = json[0].marca;
      document.getElementById("clienteidModificar").value =
        json[0].razon_social;
      document.getElementById("id").value = json[0].id;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function actualizarInventario() {
  const nombre = document.getElementById("nombreModificar").value;
  const referencia = document.getElementById("referenciaModificar").value;
  const estado = document.getElementById("estadoModificar").value;
  const marca = document.getElementById("marcaModificar").value;
  const clienteid = document.getElementById("clienteidModificar").value;
  const idinventario = document.getElementById("id").value;

  fetch(`http://localhost:8000/gestion/inventario/${idinventario}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      referencia: referencia,
      estado: estado,
      clienteid: clienteid,
      marca: marca,
      idinventario: idinventario,
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
