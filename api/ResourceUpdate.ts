import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from './LwM2M.js'
import { PublicDeviceId } from './DeviceId.js'

export const ResourceUpdate = Type.Object(
	{
		'@context': Type.Literal(Context.resourceUpdate.toString()),
		ObjectID,
		ObjectInstanceID,
		ObjectVersion,
		Resources,
		ts: Type.RegExp(
			/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
			{
				title: 'Time when the update was received, formatted as ISO 8601',
				examples: ['2024-04-19T08:45:00.000Z'],
			},
		),
		deviceId: PublicDeviceId,
	},
	{
		title: 'Resource history',
		description: 'Describes an update to a LwM2M resource for a device.',
	},
)
