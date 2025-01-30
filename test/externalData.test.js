import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import nock from "nock";
import request from "supertest";
import { app } from "../src/app.js";
import { fetchExternalData } from "../src/service.js";
import { API_EXTERNA } from '../src/utils/env.config.js';

// Mockea y testea las respouestas de una peticion a una api externa
describe("Servicio de datos externos", () => {
  before(() => {
    console.log("Iniciando test");
  });

  after(() => {
    console.log("Test finalizados");
    nock.cleanAll();
  });
  // mokea los datos de la peticion
  test("Debe devolver datos mokeados correctamente", async () => {
    nock(`${API_EXTERNA}`)
      .get("/users")
      .reply(200, [{ id: 1, name: "Leanne Graham" }]);

    const data = await fetchExternalData();
    assert.strictEqual(data[0].name, "Leanne Graham");
  });

  // maneja un error en la peticion
  test("Manejo de errores en la peticion", async () => {
    nock(`${API_EXTERNA}`)
      .get("/users")
      .reply(500, { error: "Error en el servidor" });

    try {
      await fetchExternalData();
      assert.fail("No se lanzo un error");
    } catch (error) {
      assert.strictEqual(error.response.status, 500);
      assert.deepStrictEqual(error.response.data, {
        error: "Error en el servidor",
      });
    }
  });
});

// ! Tests practicos para objeto de prueba

describe("String operations", () => {
  describe("toUpperCase()", () => {
    test("converts lowercase to uppercase", () => {
      assert.strictEqual("hello".toUpperCase(), "HELLO");
    });
  });

  describe("split()", () => {
    test("splits string by a delimiter", () => {
      assert.deepStrictEqual("a,b,c".split(","), ["a", "b", "c"]);
    });
  });
});


// describe('GET /external-data', () => {
//   test('should call next with error if fetchExternalData fails', async () => {
//       // Simula un error en fetchExternalData
//       const originalFetchExternalData = app.fetchExternalData;
//       app.fetchExternalData = async () => {
//           throw new Error('Failed to fetch data');
//       };

//       const response = await request(app)
//           .get('/external-data')
//           .expect(500); // Espera un código de estado 500

//       assert.strictEqual(response.body.error, 'Failed to fetch data');

//       // Restaura la función original
//       app.fetchExternalData = originalFetchExternalData;
//   });
// });
