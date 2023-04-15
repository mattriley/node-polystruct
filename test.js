const test = require('node:test');
const assert = require('node:assert');
const polystruct = require('./polystruct');

const ref = {
    foo: {
        bar: 'foo',
    },
    bar: {
        foo: 'bar'
    }
};

test('all enabled', () => {
    const expected = {
        foo: {
            enabled: true,
            bar: 'foo',
        },
        bar: {
            enabled: true,
            foo: 'bar'
        }
    };

    const inputs = [
        true,
        ['foo', 'bar'],
        [['foo', true], ['bar', true]],
        [['foo', { enabled: true }], ['bar', { enabled: true }]],
        { foo: true, bar: true },
        { foo: { enabled: true }, bar: { enabled: true } }
    ];

    inputs.forEach(input => {
        const actual = polystruct(input, ref);
        assert.deepEqual(actual, expected);
    });

});

test('all disabled', () => {
    const expected = {
        foo: {
            enabled: false,
            bar: 'foo',
        },
        bar: {
            enabled: false,
            foo: 'bar'
        }
    };

    const inputs = [
        false,
        null,
        undefined,
        [],
        [['foo', false], ['bar', false]],
        [['foo', null], ['bar', null]],
        [['foo', undefined], ['bar', undefined]],
        [['foo', { enabled: false }], ['bar', { enabled: false }]],
        [['foo', { enabled: null }], ['bar', { enabled: null }]],
        [['foo', { enabled: undefined }], ['bar', { enabled: undefined }]],
        { foo: false, bar: false },
        { foo: null, bar: null },
        { foo: undefined, bar: undefined },
        { foo: { enabled: false }, bar: { enabled: false } },
        { foo: { enabled: null }, bar: { enabled: null } },
        { foo: { enabled: undefined }, bar: { enabled: undefined } }
    ];

    inputs.forEach(input => {
        const actual = polystruct(input, ref);
        assert.deepEqual(actual, expected);
    });

});

test('enable one of two', () => {
    const expected = {
        foo: {
            enabled: false,
            bar: 'foo',
        },
        bar: {
            enabled: true,
            foo: 'bar'
        }
    };

    const inputs = [
        ['bar'],
        [['bar', true]],
        [['bar', { enabled: true }]],
        { bar: true },
        { bar: { enabled: true } }
    ];

    inputs.forEach(input => {
        const actual = polystruct(input, ref);
        assert.deepEqual(actual, expected);
    });

});
