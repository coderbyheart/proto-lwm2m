import { describe, it } from 'node:test'
import assert from 'node:assert'
import { typeboxDefinition } from 'lwm2m/typeboxDefinition'

void describe('typeboxDefinition', () => {
	void it(`should create the typebox definition given an ID of a LwM2M object`, async () => {
		const typeDefinition = await typeboxDefinition(14201)

		assert.deepEqual(
			typeDefinition.properties.Resources.properties[0].title,
			'Latitude',
		)
		assert.deepEqual(
			typeDefinition.properties.Resources.properties[0].type,
			'number',
		)
		assert.deepEqual(typeDefinition.properties.Resources.properties[0].$id, '0')
	})
})
