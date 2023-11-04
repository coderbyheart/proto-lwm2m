import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { stripEmptyValues } from './stripEmptyValues.js'

void describe('stripEmptyValues()', () => {
	void it('should remove empty values', () =>
		assert.deepEqual(
			stripEmptyValues([
				{ bn: 14202, n: 0, v: 99, bt: 1699049685992 },
				{ n: 1, v: 4.179 },
				{ n: 2, v: 0 },
				{ n: 3, v: 25.7 },
				{ n: 4, v: null },
				{ n: 5, v: null },
			]),
			[
				{ bn: 14202, n: 0, v: 99, bt: 1699049685992 },
				{ n: 1, v: 4.179 },
				{ n: 2, v: 0 },
				{ n: 3, v: 25.7 },
			],
		))
})
