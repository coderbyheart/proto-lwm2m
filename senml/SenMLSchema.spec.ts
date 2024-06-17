import { describe, it } from 'node:test'
import { SenML, type SenMLType } from './SenMLSchema.js'
import assert from 'node:assert/strict'
import { validate } from '../validate.js'

void describe('SenMLType', () => {
	void it('it should validate a SenML payload', () => {
		const example: SenMLType = [
			{
				bn: '14201/0/',
				n: '0',
				v: 33.98755678796222,
				bt: 1698155694,
			},
			{ n: '1', v: -84.506132079174634 },
		]
		const res = validate(SenML)(example)
		assert.equal('errors' in res, false)
		assert.deepEqual('value' in res && res.value, example)
	})
})
