function registro() {
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let email = document.getElementById("email").value;
  let repiteemail = document.getElementById("repiteemail").value;
  let password = document.getElementById("password").value;
  let repitepassword = document.getElementById("repitepassword").value;
  let DNI = document.getElementById("DNI").value;
  let telefono = document.getElementById("telefono").value;
  let clientesid = document.getElementById("clientesid").value;

  if (email != repiteemail) {
    Tregistrorepiteemail();
  } else if (password != repitepassword) {
    Tregistrorepitepassword();
  } else if (email != repiteemail && password != repitepassword) {
    Tregistrorepitepasswordemail();
  } else {
    fetch(`http://localhost:8000/user/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        password: password,
        DNI: DNI,
        telefono: telefono,
        clientesid: clientesid,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.message === `Usuario con email ${email} ya registrado `) {
          Tyaregistrado(json.message);
        } else if (json.message == `Usuario registrado con éxito`) {
          TregistroOK();
          setTimeout(function () {
            window.location.href = "/index.html";
          }, 2000);
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}
