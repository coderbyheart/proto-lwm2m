import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createObjectDefinition } from 'lwm2m/createObjectDefinition'

void describe('createObjectDefinition', () => {
	void it(`should create the typebox definition for an object`, () => {
		const resource = createObjectDefinition({
			objectId: '14201',
			objectVersion: '1.0',
			resources: [
				"Latitude : Type.Optional(\n        Type.Array(\n        Type.Object({},{description: 'The decimal notation of latitude.',})\n    )\n    )",
			],
			description: 'Describes the geo location of a device',
		})

		const expected = `Type.Object({ObjectVersion: Type.String({examples:['1.0']}), ObjectID: Type.Number({examples:[14201]}), Resources: Type.Object({Latitude : Type.Optional(\n        Type.Array(\n        Type.Object({},{description: 'The decimal notation of latitude.',})\n    )\n    )})}, {description: 'Describes the geo location of a device'})`

		assert.equal(resource, expected)
	})
})
