import { describe, it } from 'node:test'
import assert from 'node:assert'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { validateWithTypeBox } from './validateWithTypebox.js'

/**
 * Typebox type definition
 */
export const test_99 = Type.Object({
	99: Type.Date({
		$id: '99',
		title: 'Timestamp',
		description:
			'The timestamp of when the location measurement was performed.',
		formart: 'date',
	}),
})

void describe('validateDate', () => {
	void it(`should check date format`, async () => {
		const object: Static<typeof test_99> = {
			99: new Date(1698155694),
		}

		assert.deepEqual(new Date(1698155694), object[99])

		const result = validateWithTypeBox(test_99)(object) as unknown as {
			value: unknown
		}

		assert.deepEqual(result.value, object)
	})
})
