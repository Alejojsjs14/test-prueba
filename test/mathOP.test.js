import { test, describe, before, after } from "node:test";
import assert from "node:assert";

// Estructura
describe("Math operations", () => {
  before(() => {
    console.log("Iniciando pruebas dpara operaciones matematicas...");
  }),
    after(() => {
      console.log("Finalizando pruebas para operaciones matematicas...");
    });
  test("Addition", () => {
    const result = 2 + 2;
    assert.strictEqual(result, 4);
  });

  test("Subtraction", () => {
    const result = 5 - 3;
    assert.strictEqual(result, 2);
  });
});
