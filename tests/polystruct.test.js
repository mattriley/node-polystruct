const test = require('node:test');
const assert = require('node:assert');
const polystruct = require('../src/polystruct');

const assertEach = async (t, expected, ref, vals, opts) => {
    await Promise.all(vals.map(async val => {
        await t.test(JSON.stringify(val), () => {
            const actual = polystruct(val, ref, opts);
            assert.deepEqual(actual, expected);
        });
    }));
};

test('all enabled', async t => {
    const expected = {
        foo: { enabled: true, a: 1 },
        bar: { enabled: true, b: 2 }
    };

    const ref = {
        foo: { a: 1 },
        bar: { b: 2 }
    };

    const vals = [
        true,
        ['foo', 'bar'],
        [['foo', true], ['bar', true]],
        [['foo', 1], ['bar', 1]],
        [['foo', { enabled: true }], ['bar', { enabled: true }]],
        [['foo', { enabled: 1 }], ['bar', { enabled: 1 }]],
        { foo: true, bar: true },
        { foo: 1, bar: 1 },
        { foo: {}, bar: {} },
        { foo: { enabled: true }, bar: { enabled: true } },
        { foo: { enabled: 1 }, bar: { enabled: 1 } }
    ];

    await assertEach(t, expected, ref, vals);
});

test('all disabled', async t => {
    const expected = {
        foo: { enabled: false, a: 1 },
        bar: { enabled: false, b: 2 }
    };

    const ref = {
        foo: { a: 1 },
        bar: { b: 2 }
    };

    const vals = [
        false,
        null,
        undefined,
        0,
        [],
        [['foo', false], ['bar', false]],
        [['foo', null], ['bar', null]],
        [['foo', undefined], ['bar', undefined]],
        [['foo', 0], ['bar', 0]],
        [['foo', { enabled: false }], ['bar', { enabled: false }]],
        [['foo', { enabled: null }], ['bar', { enabled: null }]],
        [['foo', { enabled: undefined }], ['bar', { enabled: undefined }]],
        [['foo', { enabled: 0 }], ['bar', { enabled: 0 }]],
        { foo: false, bar: false },
        { foo: null, bar: null },
        { foo: undefined, bar: undefined },
        { foo: 0, bar: 0 },
        { foo: { enabled: false }, bar: { enabled: false } },
        { foo: { enabled: null }, bar: { enabled: null } },
        { foo: { enabled: undefined }, bar: { enabled: undefined } },
        { foo: { enabled: 0 }, bar: { enabled: 0 } }
    ];

    await assertEach(t, expected, ref, vals);
});

test('enable one of two', async t => {
    const expected = {
        foo: { enabled: false, a: 1 },
        bar: { enabled: true, b: 2 }
    };

    const ref = {
        foo: { a: 1 },
        bar: { b: 2 }
    };

    const vals = [
        ['bar'],
        [['bar', true]],
        [['bar', { enabled: true }]],
        { bar: true },
        { bar: { enabled: true } }
    ];

    await assertEach(t, expected, ref, vals);
});

test('option to include key and rename enabled', async t => {
    const expected = {
        foo: {
            key: 'foo',
            on: false,
            bar: 'foo'
        },
        bar: {
            key: 'bar',
            on: true,
            foo: 'bar'
        }
    };

    const ref = {
        foo: { bar: 'foo' },
        bar: { foo: 'bar' }
    };

    const vals = [
        ['bar'],
        [['bar', true]],
        [['bar', { on: true }]],
        { bar: true },
        { bar: { on: true } }
    ];

    await assertEach(t, expected, ref, vals, { key: 'key', enabled: 'on' });
});


test('ref is array', async t => {
    const expected = {
        foo: {
            enabled: false
        },
        bar: {
            enabled: true
        }
    };

    const ref = ['foo', 'bar'];

    const vals = [
        ['bar'],
        [['bar', true]],
        [['bar', { enabled: true }]],
        { bar: true },
        { bar: { enabled: true } }
    ];

    await assertEach(t, expected, ref, vals);
});
