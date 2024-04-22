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

export const ResourceUpdate = Type.Object(
	{
		'@context': Type.Literal(Context.resourceUpdate.toString()),
		ObjectID,
		ObjectInstanceID,
		ObjectVersion,
		Resources,
		ts: Timestamp,
		deviceId: PublicDeviceId,
	},
	{
		title: 'Resource history',
		description: 'Describes an update to a LwM2M resource for a device.',
	},
)
