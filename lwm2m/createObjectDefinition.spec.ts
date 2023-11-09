import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createObjectDefinition } from 'lwm2m/createObjectDefinition'

void describe('createObjectDefinition', () => {
	void it(`should create the typebox definition for an object`, () => {
		const resource = createObjectDefinition({
			objectId: '14201',
			objectVersion: '1.0',
			multiple: 'Multiple',
			mandatory: 'Optional',
			resources: [
				"Latitude : Type.Optional(\n        Type.Array(\n        Type.Object({},{description: 'The decimal notation of latitude.',})\n    )\n    )",
			],
			description: 'Describes the geo location of a device',
		})

		const expected = `Type.Optional(\n\t\tType.Array(\n\t\tType.Object({ObjectID: 14201, ObjectVersion: '1.0', Latitude : Type.Optional(\n        Type.Array(\n        Type.Object({},{description: 'The decimal notation of latitude.',})\n    )\n    )}, {description: 'Describes the geo location of a device'})\n\t)\n\t)`

		assert.equal(resource, expected)
	})
})
