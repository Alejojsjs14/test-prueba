import test from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import { app } from '../app.js'

function suma (a, b) {
    return a + b
}

const request = supertest(app)

// ? deben de tener 2 parametros - 1. nombre del test - 2. funcion anonima (call-back)
test("Suma de nuemros", () => {
    const result = suma(2, 3)
    const esperado = 5

    assert.strictEqual(result, esperado)
})

test("GET usuarios - debe devolver una lista de usuarios", async (t) => {
    const response = await request.get('/usuarios')

    assert.strictEqual(response.status, 200)
    assert.ok(Array.isArray(response.body.usuarios), 'La respuesta debe ser un array')
})