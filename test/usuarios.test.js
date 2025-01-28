import test from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import { app } from "../src/app.js";

test("GET usuarios - debe devolver una lista de usuarios", async (t) => {
  const response = await supertest(app).get("/usuarios");

  assert.strictEqual(response.status, 200);
  assert.ok(
    Array.isArray(response.body.usuarios),
    "La respuesta debe ser un array"
  );
});
