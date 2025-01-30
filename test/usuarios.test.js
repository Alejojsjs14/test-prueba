import test from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import nock from "nock";
import { app } from "../src/app.js";

//Prueba get para obtener los usuarios de una api
test("GET usuarios - debe devolver una lista de usuarios", async (t) => {
  const response = await supertest(app).get("/usuarios");

  // Valida el estado de la respuesta
  assert.strictEqual(response.status, 200);
  // Valida el tipo de contenido
  assert.ok(
    Array.isArray(response.body.usuarios),
    "La respuesta debe ser un array"
  );
});

test("GET external-data - debe devolver una lista de usuarios", async (t) => {
  const response = await supertest(app).get("/external-data");

  assert.strictEqual(response.status, 200);
  assert.ok(
    response.body,
    Array.isArray(response.body),
    "la respuesta debe ser un array"
  );
});

test("GET external-data - debe devolver un error", async (t) => {
  const response = await supertest(app).get("/external-dat").expect(404);

  console.log(response.res.err)
  assert.strictEqual(response.status, 404);

});

