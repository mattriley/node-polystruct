module.exports = [
    {
        name: 'all enabled',
        expected: {
            foo: { key: 'foo', enabled: true, a: 1 },
            bar: { key: 'bar', enabled: true, b: 2 }
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
        expected: {},
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
            bar: { key: 'bar', enabled: true, b: 2 }
        },
        ref: {
            foo: { a: 1 },
            bar: { b: 2 }
        },
        vals: [
            ['bar']
        ]
    },
    {
        name: 'ref is array',
        expected: {
            foo: { key: 'foo', enabled: true }
        },
        ref: ['foo', 'bar'],
        vals: [
            ['foo']
        ]
    },
    {
        name: 'option to rename key',
        opt: { keyNames: { key: 'id' } },
        expected: {
            foo: { id: 'foo', enabled: true }
        },
        ref: ['foo'],
        vals: [
            ['foo']
        ]
    },
    {
        name: 'option to omit key',
        opt: { keyNames: { key: null } },
        expected: {
            foo: { enabled: true }
        },
        ref: ['foo'],
        vals: [
            ['foo']
        ]
    },
    {
        name: 'option to rename enabled',
        opt: { keyNames: { enabled: 'on' } },
        expected: {
            foo: { key: 'foo', on: true }
        },
        ref: ['foo'],
        vals: [
            ['foo']
        ]
    },
    {
        name: 'option to not filter',
        opt: { filter: false },
        expected: {
            foo: { key: 'foo', enabled: true },
            bar: { key: 'bar', enabled: false }
        },
        ref: ['foo', 'bar'],
        vals: [
            ['foo']
        ]
    }
];
