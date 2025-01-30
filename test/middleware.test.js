import test from 'node:test';
import assert from 'node:assert';
import { errorHandler } from '../src/middleware/error.middleware.js'

test('errorHandler - debe devolver un error 500', async (t) => {
    const req = {};
    const res = {
        status: function (code) {
        this.statusCode = code;
        return this;
        },
        json: function (data) {
        this.jsonData = data;
        },
        statusCode: null,
        jsonData: null,
    };
    const next = () => {};

    const error = {
        statusCode: 500,
        message: 'Internal server error'
    }

    errorHandler(error, req, res, next);
    assert.strictEqual(res.statusCode, 500);
    assert.ok(
        res.jsonData,
        { message: 'Internal server error' },
        'la respuesta debe ser un array'
    );
});
