import { sum } from './index.js'
import { test } from 'node:test';
import assert from 'node:assert';

test('actualValue should be equal to expectedValue', () => {
    const x = 4
    const y = 2
    const actualValue = sum(x, y)
    const expectedValue = 6
    assert.equal(actualValue, expectedValue)
})