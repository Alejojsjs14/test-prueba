import { test } from 'node:test'
import assert from 'node:assert'

function suma (a, b) {
    return a + b
}

test('should return 2 when adding 1 + 1', () => {
  const result = 1 + 1;
  assert.strictEqual(result, 2, '1 + 1 should equal 2');
});

// ? deben de tener 2 parametros - 1. nombre del test - 2. funcion anonima (call-back)
test("Suma de nuemros", () => {
    const result = suma(2, 3)
    const esperado = 5

    assert.strictEqual(result, esperado)
})