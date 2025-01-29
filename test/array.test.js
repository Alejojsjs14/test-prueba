import { test, describe, beforeEach } from "node:test";
import assert from "node:assert";

describe("Array operations", () => {
  let array;

  beforeEach(() => {
    // Configuración común antes de cada prueba
    array = [1, 2, 3];
  });

  //Valida que el array tenga una longitud de 3
  test("Array length", () => {
    assert.strictEqual(array.length, 3);
  });

  //Valida que el array incluya el valor 2
  test("Array includes a value", () => {
    assert.ok(array.includes(2));
  });
});
