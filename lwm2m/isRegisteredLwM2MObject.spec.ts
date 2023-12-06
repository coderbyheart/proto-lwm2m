import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { isRegisteredLwM2MObject } from './isRegisteredLwM2MObject.js'

void describe('isRegisteredLwM2MObject()', () => {
	void it('should validate a LwM2M object', () => {
		const o = {
			ObjectID: 14201,
			ObjectVersion: '1.0',
			Resources: {
				0: 33.98771459323253,
				1: -84.50632147267358,
				2: 241.9342498779297,
				3: 11.317643165588379,
				4: 0.03478508070111275,
				5: 90.31222534179688,
				6: 'GNSS',
				99: new Date(1699049744000),
			},
		}
		assert.equal(isRegisteredLwM2MObject(o), true)
	})

	void it('should validate a LwM2M object with optional resources', () => {
		const o = {
			ObjectID: 14201,
			ObjectVersion: '1.0',
			Resources: {
				0: 33.98771459323253,
				1: -84.50632147267358,
				6: 'GNSS',
				99: new Date(1699049744000),
			},
		}
		assert.equal(isRegisteredLwM2MObject(o), true)
	})

	void it('should not validate an unknown LwM2M object', () => {
		const o = {
			ObjectID: 666,
			ObjectVersion: '1.0',
			Resources: {
				0: 42,
			},
		}
		assert.equal(isRegisteredLwM2MObject(o), false)
	})
})
