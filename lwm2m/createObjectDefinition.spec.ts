import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createObjectDefinition } from 'lwm2m/createObjectDefinition'

void describe('createObjectDefinition', () => {
	void it(`should create the typebox definition for an object`, () => {
		const resource = createObjectDefinition({
			multiple: 'Multiple',
			mandatory: 'Optional',
			resources: [
				"Latitude : Type.Optional(\n        Type.Array(\n        Type.Object({},{description: 'The decimal notation of latitude.',})\n    )\n    )",
			],
		})

		const expected = `Type.Optional(\n\t\tType.Array(\n\t\tType.Object({Latitude : Type.Optional(\n        Type.Array(\n        Type.Object({},{description: 'The decimal notation of latitude.',})\n    )\n    )})\n\t)\n\t)`

		assert.equal(resource, expected)
	})
})
