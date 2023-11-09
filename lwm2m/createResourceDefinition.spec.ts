import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createResourceDefinition } from 'lwm2m/createResourceDefinition'

void describe('createResourceDefinition', () => {
	void it(`should create the typebox definition for a resource`, () => {
		const resource = createResourceDefinition({
			name: 'Latitude',
			multiple: 'Multiple',
			mandatory: 'Optional',
			description: 'The decimal notation of latitude.',
		})

		const expected =
			"Latitude : Type.Optional(\n        Type.Array(\n        Type.Object({},{description: 'The decimal notation of latitude.',})\n    )\n    )"

		assert.equal(resource, expected)
	})
})
