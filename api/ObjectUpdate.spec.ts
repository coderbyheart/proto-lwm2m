import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validate } from '../validate.js'
import { ObjectUpdate } from './ObjectUpdate.js'
import type { Static } from '@sinclair/typebox'

void describe('ObjectUpdate', () => {
	void it('should validate', () => {
		const input: Static<typeof ObjectUpdate> = {
			'@context': 'https://github.com/hello-nrfcloud/proto-map/object/update',
			ObjectID: 14201,
			ObjectVersion: '1.0',
			ObjectInstanceID: 0,
			Resources: {
				'0': 70.374978,
				'1': 31.104015,
				'3': 1,
				'6': 'Fixed',
				'99': '${tsISO}',
			},
			deviceId: 'bassetto-ennobler-toilless',
			ts: '2024-04-19T08:30:00.000Z',
		}
		const maybeValid = validate(ObjectUpdate)(input)
		assert.equal('errors' in maybeValid, false)
		assert.deepEqual('value' in maybeValid && maybeValid.value, input)
	})
})
