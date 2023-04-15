const test = require('node:test');
const assert = require('node:assert');
const scenarios = require('./scenarios');
const polystruct = require('../src/polystruct');

scenarios.forEach(scenario => {
    test(scenario.name, async t => {
        await Promise.all(scenario.vals.map(async val => {
            await t.test(JSON.stringify(val), () => {
                const actual = polystruct(val, scenario.ref, scenario.opt);
                assert.deepEqual(actual, scenario.expected);
            });
        }));
    });
});
