//Test de integración de clientes:

//Añadir clientes------------------------------------------------------------------------------------------------------------------------------
//Test 1
test("Obtiene 400 cuando no se inserta nada", async () => {
  const respuesta = await fetch(`http://localhost:8000/clientes/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  expect(respuesta.status).toBe(400);
});

//Test 2
test("Obtiene 409 cuando la empresa ya esta registrada", async () => {
  const respuesta = await fetch(`http://localhost:8000/clientes/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razon_social: "laila",
      CIF: "b56432512",
      sector: "lavanderia",
      telefono: "987654321",
      numeroempleados: 32,
    }),
  });
  expect(respuesta.status).toBe(409);
});

//Test 3
test("Obtiene 201 cuando el registro es correcto", async () => {
  const respuesta = await fetch(`http://localhost:8000/clientes/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razon_social: "laila",
      CIF: "b56432543",
      sector: "lavanderia",
      telefono: "987654321",
      numeroempleados: 32,
    }),
  });
  expect(respuesta.status).toBe(201);
});

//Actualizar clientes------------------------------------------------------------------------------------------------------------------------------

//Test 1
test("Obtiene 400 cuando no se inserta nada", async () => {
  const respuesta = await fetch(`http://localhost:8000/clientes/update/21`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  expect(respuesta.status).toBe(400);
});

//Test 2
test("Obtiene 201 cuando la actualizacion es correcta", async () => {
  const respuesta = await fetch(`http://localhost:8000/clientes/update/21`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      razon_social: "laila",
      CIF: "b56432543",
      sector: "lavanderie",
      telefono: "987654321",
      numeroempleados: 32,
    }),
  });
  expect(respuesta.status).toBe(200);
});
