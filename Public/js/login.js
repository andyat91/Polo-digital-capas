window.addEventListener("load", loginok);

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Login
  fetch(`http://localhost:8000/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      if (
        json.message == "Email incorrecto" ||
        json.message == "Error al recibir el body"
      ) {
        TostifyLogin(json.message);
      } else {
        localStorage.setItem("nombre", json.nombre);
        localStorage.setItem("apellidos", json.apellidos);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function loginok() {
  const nombre = localStorage.getItem("nombre");
  const apellidos = localStorage.getItem("apellidos");

  if (nombre == null) {
    const loginContainer = document.getElementById("login");
    loginContainer.innerHTML = `<li ><a href="/html/login.html" id="login">Login</a></li>`;
  } else {
    const loginContainer = document.getElementById("login");
    loginContainer.innerHTML = `<li class="login"><a href="/html/login.html" class="containerlogin">${nombre} ${apellidos}<button onclick="logout()">Logout</button></a></li>`;
  }
}

function logout() {
  localStorage.removeItem("nombre");
  localStorage.removeItem("apellidos");
}
