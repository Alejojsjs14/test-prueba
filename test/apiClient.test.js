import {
  describe,
  test,
  before,
  after,
  beforeEach,
  afterEach,
} from "node:test";
import assert from "assert";
import nock from "nock";
import { fetchUser } from "../src/apiClient.js";
import { BASE_URL } from "../src/utils/env.config.js";
import axios from "axios";

/**
 * Prueba los elementos de before, after, beforeEach y afterEach en una peticion simulada con nock
 */

describe("Pruebas para fetchUser()", () => {
  let apiMock;

  before(() => {
    console.log("Iniciando las pruebas...");
  });

  after(() => {
    console.log("Finalizando las pruebas...");
  });

  beforeEach(() => {
    console.log("Configurando interceptores con Nock...");
    apiMock = nock(BASE_URL);
  });

  afterEach(() => {
    console.log("Limpiando interceptores de Nock...");
    nock.cleanAll(); // Limpia todos los interceptores después de cada prueba.
  });

  test("debería retornar los datos del usuario correctamente", async () => {
    const userId = 1;
    const mockResponse = { id: userId, name: "John Doe" };

    // Configuramos el interceptor con Nock
    apiMock.get(`/users/${userId}`).reply(200, mockResponse);

    // Llamamos a la función bajo prueba
    const result = await fetchUser(userId);

    // Verificamos el resultado
    assert.deepStrictEqual(result, mockResponse);
  });

  test("debería manejar un error 404 correctamente", async () => {
    const userId = 999;

    // Configuramos el interceptor con Nock
    apiMock.get(`/users/${userId}`).reply(404, { message: "User not found" });

    try {
      // Llamamos a la función bajo prueba
      await fetchUser(userId);
    } catch (error) {
      // Verificamos que se maneja correctamente el error
      assert.strictEqual(error.response.status, 404);
      assert.strictEqual(error.response.data.message, "User not found");
    }
  });

  test("debería manejar un error de red correctamente", async () => {
    const userId = 2;

    // Configuramos el interceptor con Nock
    apiMock.get(`/users/${userId}`).replyWithError("Network Error");

    try {
      // Llamamos a la función bajo prueba
      await fetchUser(userId);
    } catch (error) {
      // Verificamos que el error de red se maneja correctamente
      assert.strictEqual(error.message, "Network Error");
    }
  });

  test("debería enviar el token de autorización en los headers", async () => {
    
    nock("https://api.example.com", {
      reqheaders: { Authorization: "Bearer mysecrettoken" },
    })
      .get("/users/1")
      .reply(200, { id: 1, name: "Julio Verne" });

    const response = await axios.get("https://api.example.com/users/1", {
      headers: { Authorization: "Bearer mysecrettoken" },
    });

    assert.strictEqual(response.status, 200);
    assert.deepStrictEqual(response.data, { id: 1, name: "Julio Verne" });
  });

  test('debería eliminar un usuario correctamente', async () => {
    nock('https://api.example.com')
      .delete('/users/1')
      .reply(204);
  
    const response = await axios.delete('https://api.example.com/users/1');
  
    assert.strictEqual(response.status, 204);
  });

  test('debería enviar los datos correctamente en un POST', async () => {
    nock('https://api.example.com')
      .post('/users', { name: 'Alice', age: 25 })
      .reply(201, { id: 2, name: 'Alice', age: 25 });
  
    const response = await axios.post('https://api.example.com/users', {
      name: 'Alice',
      age: 25,
    });
  
    assert.strictEqual(response.status, 201);
    assert.deepStrictEqual(response.data, { id: 2, name: 'Alice', age: 25 });
  });
});
