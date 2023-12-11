import { describe, it } from 'node:test'
import {
	senMLtoLwM2M,
	type LwM2MObjectInstance,
} from '../../../senml/senMLtoLwM2M.js'
import { TransformerType, type Transformer } from '../../types.js'
import jsonata from 'jsonata'
import { arrayContaining, check } from 'tsmatchers'
import { models } from '../../../models/models.js'

void describe('asset_tracker_v2+AWS examples', () => {
	for (const [input, expected] of [
		[
			'./shadow/example-1.json',
			[
				{
					ObjectID: 14202,
					Resources: {
						1: 4.398,
						99: new Date(1699050063028),
					},
				},
				{
					ObjectID: 14205,
					Resources: {
						0: 27.06,
						1: 31.125,
						2: 97.748,
						99: new Date(1699050061608),
					},
				},
				{
					ObjectID: 14203,
					Resources: {
						11: 8,
						99: new Date(1699050062990),
					},
				},
			],
		],
		[
			'./shadow/example-2.json',
			[
				{
					ObjectID: 14201,
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
				},
				{
					ObjectID: 14202,
					Resources: {
						1: 4.414,
						99: new Date(1699049729959),
					},
				},

				{
					ObjectID: 14205,
					Resources: {
						0: 21.915307998657227,
						1: 34.569278717041016,
						2: 98.846,
						10: 148,
						99: new Date(1699049729518),
					},
				},
			],
		],
		[
			'./shadow/example-3.json',
			[
				{
					ObjectID: 14203,
					Resources: {
						2: -95,
						11: 7,
						99: new Date(1699049610301),
					},
				},
			],
		],
		[
			'./shadow/example-4.json',
			[
				{
					ObjectID: 14204,
					Resources: {
						0: '358299840016535',
						1: '89450421180216254864',
						2: 'mfw_nrf91x1_2.0.0-77.beta',
						3: '0.0.0-development',
						4: 'thingy91x_nrf9161',
						99: new Date(1699284007851),
					},
				},
				{
					ObjectID: 14202,
					Resources: {
						0: 99,
						1: 4.179,
						2: 0,
						3: 25.7,
						99: new Date(1699049685992),
					},
				},
			],
		],
		[
			'./shadow/example-5.json',
			[
				{
					ObjectID: 14202,
					Resources: {
						0: 89,
						1: 4.161,
						99: new Date(1701900277007),
					},
				},
			],
		],
	] as [string, Array<LwM2MObjectInstance>][]) {
		void it(input, async () => {
			const result = await transformShadowUpdateToLwM2M(
				(models['asset_tracker_v2+AWS']?.transforms ?? []).filter(
					({ type }) => type === TransformerType.Shadow,
				),
			)(
				await import(input, {
					assert: { type: 'json' },
				}),
			)

			for (const expectedObject of expected) {
				check(result).is(arrayContaining(expectedObject))
			}
		})
	}
})

/**
 * Very simple implementation of a converter.
 */
const transformShadowUpdateToLwM2M = (transformers: Transformer[]) => {
	// Turn the JSONata in the transformers into executable functions
	const transformerFns: Array<{
		match: ReturnType<typeof jsonata>
		matchExpression: string
		transform: ReturnType<typeof jsonata>
		transformExpression: string
	}> = []

	for (const {
		match: matchExpression,
		transform: transformExpression,
	} of transformers) {
		let match: ReturnType<typeof jsonata>
		let transform: ReturnType<typeof jsonata>
		try {
			match = jsonata(matchExpression)
		} catch {
			throw new Error(`Failed to parse match expression '${matchExpression}'`)
		}
		try {
			transform = jsonata(transformExpression)
		} catch {
			throw new Error(
				`Failed to parse match expression '${transformExpression}'`,
			)
		}
		transformerFns.push({
			match,
			matchExpression,
			transform,
			transformExpression,
		})
	}

	return async (input: {
		state: {
			reported?: Record<string, unknown>
			desired?: Record<string, unknown>
		}
	}): Promise<Array<LwM2MObjectInstance>> =>
		Promise.all(
			transformerFns.map(
				async ({ match, matchExpression, transform, transformExpression }) => {
					// Check if the `matched` JSONata returns `true`.
					try {
						const matched = await match.evaluate(input)
						if (typeof matched !== 'boolean') return null
						if (matched === false) return null
					} catch (err) {
						console.error(err)
						console.error(
							`Failed to match ${JSON.stringify(
								input,
							)} using expression '${matchExpression}'!`,
						)
						return false
					}
					// Transform
					try {
						return await transform.evaluate(input)
					} catch (err) {
						console.error(err)
						console.error(
							`Failed to transform ${JSON.stringify(
								input,
							)} using expression '${transformExpression}'!`,
						)
						return null
					}
				},
			),
		)
			.then((result) => result.flat())
			// Ignore unmatched transformers
			.then((result) => result.filter((item) => item !== null))
			// Convert it to LwM2M
			.then(senMLtoLwM2M)
}
