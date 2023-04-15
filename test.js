const test = require('node:test');
const assert = require('node:assert');
const restruct = require('./restruct');

const ref = {
    foo: {
        bar: 'foo',
    },
    bar: {
        foo: 'bar'
    }
};


test('all enabled when val is undefined', () => {
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

    const actual = restruct(undefined, ref);
    assert.deepEqual(actual, expected);
});

test('all enabled when val is true', () => {
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

    const actual = restruct(true, ref);
    assert.deepEqual(actual, expected);
});

test('all disabled when val is null', () => {
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

    const actual = restruct(undefined, ref);
    assert.deepEqual(actual, expected);
});

test('all disabled when val is false', () => {
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

    const actual = restruct(false, ref);
    assert.deepEqual(actual, expected);
});

test('disabled unless specified when val is array', () => {
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

    const actual = restruct(['bar'], ref);
    assert.deepEqual(actual, expected);
});

test('all enabled when all specified when val is array', () => {
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

    const actual = restruct(['foo', 'bar'], ref);
    assert.deepEqual(actual, expected);
});

test('all disabled when val is empty array', () => {
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

    const actual = restruct([], ref);
    assert.deepEqual(actual, expected);
});

test('disabled unless specified when val is array of arrays', () => {
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

    const actual = restruct([['bar', true]], ref);
    assert.deepEqual(actual, expected);
});

test('disabled unless specified when val is array of arrays', () => {
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

    const actual = restruct([['bar', false]], ref);
    assert.deepEqual(actual, expected);
});

test('disabled unless specified when val is array of arrays', () => {
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

    const actual = restruct([['bar', undefined]], ref);
    assert.deepEqual(actual, expected);
});

test('combination of enabled and disabled', () => {
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
        [['bar', undefined]],
        [['bar', { enabled: true }]],
        { bar: true },
        { bar: { enabled: true } }
    ];

    inputs.forEach(input => {
        const actual = restruct(input, ref);
        assert.deepEqual(actual, expected);
    });

});

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
        undefined,
        ['foo', 'bar'],
        [['foo', true], ['bar', true]],
        [['foo', undefined], ['bar', undefined]],
        [['foo', { enabled: true }], ['bar', { enabled: true }]],
        { foo: true, bar: true },
        { foo: { enabled: true }, bar: { enabled: true } }
    ];

    inputs.forEach(input => {
        const actual = restruct(input, ref);
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
        [],
        [['foo', false], ['bar', false]],
        [['foo', null], ['bar', null]],
        [['foo', { enabled: false }], ['bar', { enabled: false }]],
        { foo: false, bar: false },
        { foo: { enabled: false }, bar: { enabled: false } }
    ];

    inputs.forEach(input => {
        const actual = restruct(input, ref);
        assert.deepEqual(actual, expected);
    });

});
