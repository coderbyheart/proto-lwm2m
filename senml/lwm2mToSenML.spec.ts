import { it, describe } from 'node:test'
import type { SenMLType } from './SenMLSchema.js'
import type {
	Geolocation_14201,
	SeaWaterLevel_14230,
} from '../lwm2m/objects.js'
import { LwM2MObjectID } from '../lwm2m/LwM2MObjectID.js'
import assert from 'node:assert/strict'
import type { LwM2MObjectInstance } from './senMLtoLwM2M.js'
import { lwm2mToSenML } from './lwm2mToSenML.js'

void describe('lwm2mToSenML()', () => {
	void it('should convert LwM2M to SenML', () => {
		const location: LwM2MObjectInstance<Geolocation_14201> = {
			ObjectID: LwM2MObjectID.Geolocation_14201,
			ObjectVersion: '1.0',
			Resources: {
				'0': 62.469414,
				'1': 6.151946,
				'6': 'Fixed',
				'3': 1,
				'99': new Date(1710147413003),
			},
		}
		const level1: LwM2MObjectInstance<SeaWaterLevel_14230> = {
			ObjectID: LwM2MObjectID.SeaWaterLevel_14230,
			ObjectVersion: '1.0',
			Resources: {
				'0': 84.3,
				'1': 'AES',
				'99': new Date(1710140400000),
			},
		}
		const level2: LwM2MObjectInstance<SeaWaterLevel_14230> = {
			ObjectID: LwM2MObjectID.SeaWaterLevel_14230,
			ObjectVersion: '1.0',
			Resources: {
				'0': 140.4,
				'1': 'AES',
				'99': new Date(1710144000000),
			},
		}
		const level3: LwM2MObjectInstance<SeaWaterLevel_14230> = {
			ObjectID: LwM2MObjectID.SeaWaterLevel_14230,
			ObjectVersion: '1.0',
			ObjectInstanceID: 1,
			Resources: {
				'0': 140.7,
				'1': 'AES',
				'99': new Date(1710144001000),
			},
		}
		const lwm2m: Array<LwM2MObjectInstance<any>> = [
			location,
			level1,
			level2,
			level3,
		]
		const expected: SenMLType = [
			{ bn: '/14201/0/', n: '0', v: 62.469414, bt: 1710147413003 },
			{ n: '1', v: 6.151946 },
			{ n: '3', v: 1 },
			{ n: '6', vs: 'Fixed' },
			{ bn: '/14230/0/', n: '0', v: 84.3, bt: 1710140400000 },
			{ n: '1', vs: 'AES' },
			{ bn: '/14230/0/', n: '0', v: 140.4, bt: 1710144000000 },
			{ n: '1', vs: 'AES' },
			{ bn: '/14230/1/', n: '0', v: 140.7, bt: 1710144001000 },
			{ n: '1', vs: 'AES' },
		]

		assert.deepEqual(lwm2mToSenML(lwm2m), expected)
	})
})
