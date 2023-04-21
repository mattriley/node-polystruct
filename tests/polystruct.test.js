const test = require('node:test');
const assert = require('node:assert');
const scenarios = require('./scenarios');
const polystruct = require('../src/polystruct');

const only = scenarios.filter(s => !!s.only);
(only.length ? only : scenarios).forEach(scenario => {
    test(scenario.name, async t => {
        await Promise.all(scenario.inputs.map(async val => {
            await t.test(JSON.stringify(val), () => {
                const actual = polystruct(val, scenario.referenceObject, scenario.options);
                assert.deepEqual(actual, scenario.expected);
            });
        }));
    });
});
