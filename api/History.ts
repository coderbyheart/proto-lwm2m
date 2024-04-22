import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from './LwM2M.js'
import { PublicDeviceId } from './DeviceId.js'
import { Timestamp } from './Timestamp.js'

export const ResourceHistory = Type.Object(
	{
		'@context': Type.Literal(Context.history.resource.toString()),
		partialInstances: Type.Array(
			Type.Intersect(
				[
					Resources,
					Type.Object({
						ts: Timestamp,
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
