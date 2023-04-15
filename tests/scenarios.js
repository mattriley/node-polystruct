module.exports = [
    {
        name: 'all enabled',
        expected: {
            foo: { enabled: true, a: 1 },
            bar: { enabled: true, b: 2 }
        },
        ref: {
            foo: { a: 1 },
            bar: { b: 2 }
        },
        vals: [
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
        ]
    },
    {
        name: 'all disabled',
        expected: {
            foo: { enabled: false, a: 1 },
            bar: { enabled: false, b: 2 }
        },
        ref: {
            foo: { a: 1 },
            bar: { b: 2 }
        },
        vals: [
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
        ]
    },
    {
        name: 'enable one of two',
        expected: {
            foo: { enabled: false, a: 1 },
            bar: { enabled: true, b: 2 }
        },
        ref: {
            foo: { a: 1 },
            bar: { b: 2 }
        },
        vals: [
            ['bar'],
            [['bar', true]],
            [['bar', { enabled: true }]],
            { bar: true },
            { bar: { enabled: true } }
        ]
    },
    {
        name: 'option to include key and rename enabled',
        opt: { key: 'key', enabled: 'on' },
        expected: {
            foo: { key: 'foo', on: false, bar: 'foo' },
            bar: { key: 'bar', on: true, foo: 'bar' }
        },
        ref: {
            foo: { bar: 'foo' },
            bar: { foo: 'bar' }
        },
        vals: [
            ['bar'],
            [['bar', true]],
            [['bar', { on: true }]],
            { bar: true },
            { bar: { on: true } }
        ]
    },
    {
        name: 'ref is array',
        expected: {
            foo: { enabled: false },
            bar: { enabled: true }
        },
        ref: ['foo', 'bar'],
        vals: [
            ['bar'],
            [['bar', true]],
            [['bar', { enabled: true }]],
            { bar: true },
            { bar: { enabled: true } }
        ]
    }
];
