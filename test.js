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

test('all enabled when all specified when val is empty array', () => {
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
