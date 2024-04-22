import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from './LwM2M.js'
import { PublicDeviceId } from './DeviceId.js'

export const ResourceHistory = Type.Object(
	{
		'@context': Type.Literal(Context.history.resource.toString()),
		partialInstances: Type.Array(
			Type.Intersect(
				[
					Resources,
					Type.Object({
						ts: Type.RegExp(
							/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
							{
								title:
									'Time when the update was received, formatted as ISO 8601',
								examples: ['2024-04-19T08:45:00.000Z'],
							},
						),
					}),
				],
				{
					title:
						'The resources of the object instance and the timestamp the data was received.',
				},
			),
		),
		query: Type.Object(
			{
				ObjectID,
				ObjectInstanceID,
				ObjectVersion,
				binIntervalMinutes: Type.Number({
					minimum: 1,
					title: 'The number of minutes the results are binned to.',
					examples: [15],
				}),
				deviceId: PublicDeviceId,
			},
			{ title: `The query that was used` },
		),
	},
	{
		title: 'Resource history',
		description:
			'Contains historical values of an LwM2M resource for a device.',
	},
)
