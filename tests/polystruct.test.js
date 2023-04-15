const test = require('node:test');
const assert = require('node:assert');
const polystruct = require('../src/polystruct');

const assertEach = async (t, expected, inputs, opts, _ref = ref) => {
    await Promise.all(inputs.map(async input => {
        await t.test(JSON.stringify(input), () => {
            const actual = polystruct(input, _ref, opts);
            assert.deepEqual(actual, expected);
        });
    }));
};

const ref = {
    foo: {
        bar: 'foo'
    },
    bar: {
        foo: 'bar'
    }
};

test('all enabled', async t => {
    const expected = {
        foo: {
            enabled: true,
            bar: 'foo'
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
        { foo: {}, bar: {} },
        { foo: { enabled: true }, bar: { enabled: true } }
    ];

    await assertEach(t, expected, inputs);

});

test('all disabled', async t => {
    const expected = {
        foo: {
            enabled: false,
            bar: 'foo'
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
        { foo: false, bar: false },
        { foo: null, bar: null },
        { foo: { enabled: false }, bar: { enabled: false } },
        { foo: { enabled: null }, bar: { enabled: null } }
    ];

    await assertEach(t, expected, inputs);

});

test('enable one of two', async t => {
    const expected = {
        foo: {
            enabled: false,
            bar: 'foo'
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

    await assertEach(t, expected, inputs);

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

    const inputs = [
        ['bar'],
        [['bar', true]],
        [['bar', { on: true }]],
        { bar: true },
        { bar: { on: true } }
    ];

    await assertEach(t, expected, inputs, { key: 'key', enabled: 'on' });

});


test('ref is array', async t => {
    const ref = ['foo', 'bar'];

    const expected = {
        foo: {
            enabled: false
        },
        bar: {
            enabled: true
        }
    };

    const inputs = [
        ['bar'],
        [['bar', true]],
        [['bar', { enabled: true }]],
        { bar: true },
        { bar: { enabled: true } }
    ];

    await assertEach(t, expected, inputs, {}, ref);

});
