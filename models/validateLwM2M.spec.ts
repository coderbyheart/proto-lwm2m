import { describe, it } from 'node:test'
import assert from 'node:assert'
import type { LwM2MObjectInstance } from 'senml/senMLtoLwM2M.js'
import { validateWithTypeBox } from '@hello.nrfcloud.com/proto'
import { createTypeboxType } from 'lwm2m/createTypeboxType.js'

void describe('validateLwM2M', () => {
	void it(`should validate LwM2M object follows type  definition`, async () => {
		const object: LwM2MObjectInstance = {
			ObjectID: 14201,
			ObjectVersion: '1.1',
			Resources: {
				0: 33.98755678796222,
				1: -84.506132079174634,
				2: 295.468994140625,
				3: 17.74077033996582,
				4: 26.376304626464844,
				5: 359.1545715332,
				9: 1698155694999, //new Date(1698155694999), // FIXME
			},
		}

		const typeDefinition = await createTypeboxType(14201)

		const result = validateWithTypeBox(typeDefinition)(object) as unknown as {
			value: unknown
		}

		assert.deepEqual(result.value, object)
	})
})
