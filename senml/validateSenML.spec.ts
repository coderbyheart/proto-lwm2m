import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validateSenML } from './validateSenML.js'

void describe('validateSenML()', () => {
	void it('should validate', () =>
		assert.deepEqual(
			validateSenML([
				{ bn: 14202, n: 0, v: 99, bt: 1699049685992 },
				{ n: 1, v: 4.179 },
				{ n: 2, v: 0 },
				{ n: 3, v: 25.7 },
			]),
			{
				value: [
					{ bn: 14202, n: 0, v: 99, bt: 1699049685992 },
					{ n: 1, v: 4.179 },
					{ n: 2, v: 0 },
					{ n: 3, v: 25.7 },
				],
			},
		))
})
