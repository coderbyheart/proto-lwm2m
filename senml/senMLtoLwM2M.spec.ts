import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { senMLtoLwM2M } from './senMLtoLwM2M.js'

void describe('senMLtoLwM2M()', () => {
	void it('should resolve a senML message into objects', () =>
		assert.deepEqual(
			senMLtoLwM2M([
				{
					bn: 14201,
					blv: '1.1',
					bt: 1698155694999,
					n: 0,
					v: 33.98755678796222,
				},
				{
					n: 1,
					v: -84.506132079174634,
				},
				{
					n: 2,
					v: 295.468994140625,
				},
				{
					n: 3,
					v: 17.74077033996582,
				},
				{
					n: 4,
					v: 26.376304626464844,
				},
				{
					n: 5,
					v: 359.1545715332,
				},
			]),
			[
				{
					ObjectID: 14201,
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
			],
		))

	void it('should drop empty resources', () =>
		assert.deepEqual(
			senMLtoLwM2M([
				{
					bn: 14203,
					n: 0,
					vs: 'LTE-M',
					bt: 1676369307222,
				},
				{
					n: 1,
					v: 20,
				},
				{
					n: 2,
					v: -79,
				},
				{
					n: 3,
					v: 6,
				},
				{
					n: 4,
					v: 56879116,
				},
				{
					n: 5,
					v: 24001,
				},
				{
					n: 6,
					vs: '10.160.243.113',
				},
				{
					n: 11,
				},
			]),
			[
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
			],
		))

	void it('should ignore repeated base properties', () =>
		assert.deepEqual(
			senMLtoLwM2M([
				{ bn: 14203, n: 0, vs: 'LTE-M', bt: 1699049665511 },
				{ n: 1, v: 20 },
				{ bn: 14203, n: 2, v: -89, bt: 1699049665511 },
				{ n: 3, v: 2305 },
				{ n: 4, v: 34784790 },
				{ n: 5, v: 24202 },
				{ n: 6, vs: '100.81.95.75' },
				{ bn: 14203, n: 11, v: 7, bt: 1699049665511 },
			]),
			[
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
			],
		))
})
