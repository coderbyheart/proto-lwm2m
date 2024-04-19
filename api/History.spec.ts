import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validate } from '../validate.js'
import { ResourceHistory } from './History.js'
import type { Static } from '@sinclair/typebox'

void describe('ResourceHistory', () => {
	void it('should validate', () => {
		const input: Static<typeof ResourceHistory> = {
			'@context':
				'https://github.com/hello-nrfcloud/proto-map/history/resource',
			query: {
				ObjectID: 14230,
				ObjectVersion: '1.0',
				ObjectInstanceID: 0,
				deviceId: 'bassetto-ennobler-toilless',
				binIntervalMinutes: 15,
			},
			partialInstances: [
				{
					'0': 92.2,
					'99': 1713510000000,
					ts: '2024-04-19T08:45:00.000Z',
				},
				{
					'0': 113.8,
					'99': 1713515400000,
					ts: '2024-04-19T08:30:00.000Z',
				},
			],
		}
		const maybeValid = validate(ResourceHistory)(input)
		assert.equal('errors' in maybeValid, false)
		assert.deepEqual('value' in maybeValid && maybeValid.value, input)
	})
})
