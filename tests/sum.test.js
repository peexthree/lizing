// @ts-check
const { test } = require('node:test');
const assert = require('node:assert/strict');

/**
 * Adds two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}

test('sum adds numbers', () => {
  assert.equal(sum(1, 2), 3);
});