module.exports = [
    {
        name: 'all enabled',
        expected: {
            foo: { key: 'foo', enabled: true, a: 1 },
            bar: { key: 'bar', enabled: true, b: 2 }
        },
        referenceObject: {
            foo: { a: 1 },
            bar: { b: 2 }
        },
        inputs: [
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
        referenceObject: {
            foo: { a: 1 },
            bar: { b: 2 }
        },
        inputs: [
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
        referenceObject: {
            foo: { a: 1 },
            bar: { b: 2 }
        },
        inputs: [
            ['bar']
        ]
    },
    {
        name: 'reference object is array',
        expected: {
            foo: { key: 'foo', enabled: true }
        },
        referenceObject: ['foo', 'bar'],
        inputs: [
            ['foo']
        ]
    },
    {
        name: 'option to rename key',
        options: { keyNames: { key: 'id' } },
        expected: {
            foo: { id: 'foo', enabled: true }
        },
        referenceObject: ['foo'],
        inputs: [
            ['foo']
        ]
    },
    {
        name: 'option to omit key',
        options: { keyNames: { key: null } },
        expected: {
            foo: { enabled: true }
        },
        referenceObject: ['foo'],
        inputs: [
            ['foo']
        ]
    },
    {
        name: 'option to rename enabled',
        options: { keyNames: { enabled: 'on' } },
        expected: {
            foo: { key: 'foo', on: true }
        },
        referenceObject: ['foo'],
        inputs: [
            ['foo']
        ]
    },
    {
        name: 'option to not filter',
        options: { filter: false },
        expected: {
            foo: { key: 'foo', enabled: true },
            bar: { key: 'bar', enabled: false }
        },
        referenceObject: ['foo', 'bar'],
        inputs: [
            ['foo']
        ]
    }
];
