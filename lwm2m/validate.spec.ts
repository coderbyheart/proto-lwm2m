import { describe, it } from 'node:test'
import { validate } from './validate.js'
import { validators } from './validators.js'
import { LwM2MObjectID } from './LwM2MObjectID.js'
import assert from 'node:assert'

void describe('validate()', () => {
	const v = validate(validators)
	void it('should validate a LwM2M object instance', () => {
		const object = {
			ObjectID: LwM2MObjectID.Geolocation_14201,
			ObjectVersion: '1.0',
			Resources: {
				'0': 62.469414,
				'1': 6.151946,
				'6': 'Fixed',
				'3': 1,
				'99': 1710147413003,
			},
		}
		const maybeValid = v(object)
		assert.deepEqual('object' in maybeValid && maybeValid.object, object)
	})

	void it('should return an error for an invalid object', () => {
		const maybeValid = v({})
		assert.equal('error' in maybeValid, true)
	})
})
