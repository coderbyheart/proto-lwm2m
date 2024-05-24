import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { senMLtoLwM2M } from './senMLtoLwM2M.js'
import { type LwM2MObjectInstance } from '../lwm2m/LwM2MObjectInstance.js'
import type { SenMLType } from './SenMLSchema.js'

void describe('senMLtoLwM2M()', () => {
	void it('should resolve a senML message into objects', () => {
		const input: SenMLType = [
			{
				bn: '14201/1/',
				blv: '1.1',
				bt: 1698155694999,
				n: '0',
				v: 33.98755678796222,
			},
			{
				n: '1',
				v: -84.506132079174634,
			},
			{
				n: '2',
				v: 295.468994140625,
			},
			{
				n: '3',
				v: 17.74077033996582,
			},
			{
				n: '4',
				v: 26.376304626464844,
			},
			{
				n: '5',
				v: 359.1545715332,
			},
		]
		const expected: LwM2MObjectInstance[] = [
			{
				ObjectID: 14201,
				ObjectInstanceID: 1,
				ObjectVersion: '1.1',
				Resources: {
					0: 33.98755678796222,
					1: -84.506132079174634,
					2: 295.468994140625,
					3: 17.74077033996582,
					4: 26.376304626464844,
					5: 359.1545715332,
					99: new Date(1698155694999),
				},
			},
		]
		const res = senMLtoLwM2M(input)
		assert.deepEqual('lwm2m' in res && res.lwm2m, expected)
	})

	void it('should drop empty resources', () => {
		const input: SenMLType = [
			{
				bn: '14203/0/',
				n: '0',
				vs: 'LTE-M',
				bt: 1676369307222,
			},
			{
				n: '1',
				v: 20,
			},
			{
				n: '2',
				v: -79,
			},
			{
				n: '3',
				v: 6,
			},
			{
				n: '4',
				v: 56879116,
			},
			{
				n: '5',
				v: 24001,
			},
			{
				n: '6',
				vs: '10.160.243.113',
			},
			{
				n: '11',
			},
		]
		const expected: LwM2MObjectInstance[] = [
			{
				ObjectID: 14203,
				Resources: {
					0: 'LTE-M',
					1: 20,
					2: -79,
					3: 6,
					4: 56879116,
					5: 24001,
					6: '10.160.243.113',
					99: new Date(1676369307222),
				},
			},
		]
		const res = senMLtoLwM2M(input)
		assert.deepEqual('lwm2m' in res && res.lwm2m, expected)
	})

	void it('should ignore repeated base properties', () => {
		const input: SenMLType = [
			{ bn: '14203/0/', n: '0', vs: 'LTE-M', bt: 1699049665511 },
			{ n: '1', v: 20 },
			{ bn: '14203/0/', n: '2', v: -89, bt: 1699049665511 },
			{ n: '3', v: 2305 },
			{ n: '4', v: 34784790 },
			{ n: '5', v: 24202 },
			{ n: '6', vs: '100.81.95.75' },
			{ bn: '14203/0/', n: '11', v: 7, bt: 1699049665511 },
		]
		const expected: LwM2MObjectInstance[] = [
			{
				ObjectID: 14203,
				Resources: {
					0: 'LTE-M',
					1: 20,
					2: -89,
					3: 2305,
					4: 34784790,
					5: 24202,
					6: '100.81.95.75',
					11: 7,
					99: new Date(1699049665511),
				},
			},
		]
		const res = senMLtoLwM2M(input)
		assert.deepEqual('lwm2m' in res && res.lwm2m, expected)
	})

	void it('should handle multiple measurements for the same resource', () => {
		const input: SenMLType = [
			{ bn: '14205/0/', n: '0', v: 21, bt: 1699049600000 },
			{ bn: '14205/1/', n: '0', v: 31, bt: 1699049600000 },
			{ bn: '14205/0/', n: '0', v: 22, bt: 1699049700000 },
			{ bn: '14205/1/', n: '0', v: 32, bt: 1699049700000 },
		]
		const expected: LwM2MObjectInstance[] = [
			{
				ObjectID: 14205,
				Resources: {
					0: 21,
					99: new Date(1699049600000),
				},
			},
			{
				ObjectID: 14205,
				ObjectInstanceID: 1,
				Resources: {
					0: 31,
					99: new Date(1699049600000),
				},
			},
			{
				ObjectID: 14205,
				Resources: {
					0: 22,
					99: new Date(1699049700000),
				},
			},
			{
				ObjectID: 14205,
				ObjectInstanceID: 1,
				Resources: {
					0: 32,
					99: new Date(1699049700000),
				},
			},
		]
		const res = senMLtoLwM2M(input)
		assert.deepEqual('lwm2m' in res && res.lwm2m, expected)
	})
})
