import { describe, it } from 'node:test'
import assert from 'node:assert'
import {
	LwM2MType,
	createResourceDefinition,
} from 'lwm2m/createResourceDefinition'

void describe('createResourceDefinition', () => {
	void it(`should create the typebox definition for a resource`, () => {
		const resource = createResourceDefinition({
			name: 'Latitude',
			multiple: 'Multiple',
			mandatory: 'Optional',
			description: 'The decimal notation of latitude.',
			type: LwM2MType.String,
		})

		const expected =
			"Latitude : Type.Optional(\n        Type.Array(\n        Type.String({description: 'The decimal notation of latitude.',})\n    )\n    )"

		assert.equal(resource, expected)
	})

	void it(`should create typebox def for a resource with DATE type`, () => {
		const resource = createResourceDefinition({
			name: 'Timestamp',
			multiple: 'Single',
			mandatory: 'Mandatory',
			description:
				'The timestamp of when the location measurement was performed.',
			type: LwM2MType.Time,
		})

		const expected =
			"Timestamp : Type.Date({description: 'The timestamp of when the location measurement was performed.',})"

		assert.equal(resource, expected)
	})
})
