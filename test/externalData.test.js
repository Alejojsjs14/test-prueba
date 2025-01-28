import { test, describe, before, after } from "node:test";
import assert, { AssertionError } from "node:assert";
import nock from "nock";
import { fetchExternalData } from "../src/service.js";

describe('Servicio de datos externos', () => {
    before(() => {
        console.log('Iniciando test')
    })
    
    after(() => {
        console.log('Test finalizados')
        nock.cleanAll()
    })

    test('Debe devolver datos mokeados correctamente', async () => {
        nock('https://jsonplaceholder.typicode.com')
            .get('/users')
            .reply(200, [{ id: 1, name: 'Carlos Arturo' }])

        const data = await fetchExternalData()
        assert.strictEqual(data[0].name, 'Carlos Arturo')
    })

    test('Manejo de errores en la peticion', async () => {
        nock('https://jsonplaceholder.typicode.com')
            .get('/users')
            .reply(500, { error: 'Error en el servidor'})

        try {
            await fetchExternalData()
            assert.fail('No se lanzo un error')
        } catch (error) {
            assert.strictEqual(error.response.status, 500)
            assert.deepStrictEqual(error.response.data, { error: 'Error en el servidor' })
        }
    })
})


// ! Tests practicos para objeto de prueba

/**
 * Este bloque de pruebas está diseñado para verificar las operaciones matemáticas básicas.
 * Utiliza la función `describe` de Jest para agrupar pruebas relacionadas con operaciones matemáticas.
 * Dentro de este bloque, se definen pruebas individuales para la suma y la resta.
 */

describe('Math operations', () => {
  test('Addition', () => {
    const result = 2 + 2;
    assert.strictEqual(result, 4);
  });

  test('Subtraction', () => {
    const result = 5 - 3;
    assert.strictEqual(result, 2);
  });
});

describe('Array operations', () => {
    let array;
  
    beforeEach(() => {
      // Configuración común antes de cada prueba
      array = [1, 2, 3];
    });
  
    test('Array length', () => {
      assert.strictEqual(array.length, 3);
    });
  
    test('Array includes a value', () => {
      assert.ok(array.includes(2));
    });
  });


  describe('String operations', () => {
    describe('toUpperCase()', () => {
      test('converts lowercase to uppercase', () => {
        assert.strictEqual('hello'.toUpperCase(), 'HELLO');
      });
    });
  
    describe('split()', () => {
      test('splits string by a delimiter', () => {
        assert.deepStrictEqual('a,b,c'.split(','), ['a', 'b', 'c']);
      });
    });
  });



//   import axios from 'axios';

//   export async function fetchUser(userId) {
//     const response = await axios.get(`https://api.example.com/users/${userId}`);
//     return response.data;
//   }



// import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
// import assert from 'assert';
// import nock from 'nock';
// import { fetchUser } from './apiClient.js';

/**
 * Prueba los elementos de before, after, beforeEach y afterEach en una peticion simulada con nock
 */

describe('Pruebas para fetchUser()', () => {
  const BASE_URL = 'https://api.example.com';
  let apiMock;

  before(() => {
    console.log('Iniciando las pruebas...');
  });

  after(() => {
    console.log('Finalizando las pruebas...');
  });

  beforeEach(() => {
    console.log('Configurando interceptores con Nock...');
    apiMock = nock(BASE_URL);
  });

  afterEach(() => {
    console.log('Limpiando interceptores de Nock...');
    nock.cleanAll(); // Limpia todos los interceptores después de cada prueba.
  });

  it('debería retornar los datos del usuario correctamente', async () => {
    const userId = 1;
    const mockResponse = { id: userId, name: 'John Doe' };

    // Configuramos el interceptor con Nock
    apiMock
      .get(`/users/${userId}`)
      .reply(200, mockResponse);

    // Llamamos a la función bajo prueba
    const result = await fetchUser(userId);

    // Verificamos el resultado
    assert.deepStrictEqual(result, mockResponse);
  });

  it('debería manejar un error 404 correctamente', async () => {
    const userId = 999;

    // Configuramos el interceptor con Nock
    apiMock
      .get(`/users/${userId}`)
      .reply(404, { message: 'User not found' });

    try {
      // Llamamos a la función bajo prueba
      await fetchUser(userId);
    } catch (error) {
      // Verificamos que se maneja correctamente el error
      assert.strictEqual(error.response.status, 404);
      assert.strictEqual(error.response.data.message, 'User not found');
    }
  });

  it('debería manejar un error de red correctamente', async () => {
    const userId = 2;

    // Configuramos el interceptor con Nock
    apiMock
      .get(`/users/${userId}`)
      .replyWithError('Network Error');

    try {
      // Llamamos a la función bajo prueba
      await fetchUser(userId);
    } catch (error) {
      // Verificamos que el error de red se maneja correctamente
      assert.strictEqual(error.message, 'Network Error');
    }
  });
});

