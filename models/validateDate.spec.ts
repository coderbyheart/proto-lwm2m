import { describe, it } from 'node:test'
import assert from 'node:assert'
import type { Static, TSchema } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { ErrorObject } from 'ajv'
import Ajv from 'ajv'

export const test_99 = Type.Object({
	99: Type.Date({
		$id: '99',
		title: 'Timestamp',
		description:
			'The timestamp of when the location measurement was performed.',
		formart: 'date',
	}),
})

/**
 * @see node_modules/@hello.nrfcloud.com/proto/validator/validateWithTypeBox.ts
 */
export const validateWithTypeBox = <T extends TSchema>(
	schema: T,
): ((value: unknown) =>
	| { value: Static<typeof schema> }
	| {
			errors: ErrorObject[]
	  }) => {
	const ajv = new Ajv()
	const v = ajv.compile(schema)
	return (value: unknown) => {
		const valid = v(value)
		if (valid !== true) {
			return {
				errors: v.errors as ErrorObject[],
			}
		}
		return { value: value as Static<typeof schema> }
	}
}

/**
 * When checking for date format, the following error is returned:
 *
 * "Error: schema is invalid: data/properties/Resources/properties/99/type must be equal to one of the allowed values,
 * data/properties/Resources/properties/99/type must be array, data/properties/Resources/properties/99/type must match a schema in anyOf"
 */
void describe('validateDate', () => {
	void it(`should check date format`, async () => {
		const object: Static<typeof test_99> = {
			99: new Date(1698155694),
		}

		const result = validateWithTypeBox(test_99)(object) as unknown as {
			value: unknown
		}

		assert.deepEqual(result.value, object)
	})
})
