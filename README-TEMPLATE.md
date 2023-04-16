<%- lib.renderOpening() %>

## Install

<%- await lib.renderCode('npm install polystruct', 'sh', 'https://www.npmjs.com/package/polystruct') %>

## Scenarios

<%- await lib.renderCode(lib.fetchCode('./tests/scenarios.js')) %>
