import sum from './index.js'
import { test } from 'node:test';
import assert from 'node:assert';

test('actualValue should be equal to expectedValue', () => {
    const x = 4
    const y = 2
    const actualValue = sum(x, y)
    const expectedValue = 6
    assert.equal(actualValue, expectedValue)
});

test('should return 0 if string is passed for a or b', () => {
    const a = '2';
    const b = 2;
    const actualValue = sum(a, b);
    assert.equal(actualValue, 0);
})

test('should return 0 if negative value is passed for a or b', () => {
    const a = -7;
    const b = 2;
    const actualValue = sum(a, b);
    assert.equal(actualValue, 0);
})
