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

export const ObjectUpdate = Type.Object(
	{
		'@context': Type.Literal(Context.objectUpdate.toString()),
		ObjectID,
		ObjectInstanceID: Type.Optional(ObjectInstanceID),
		ObjectVersion: Type.Optional(ObjectVersion),
		Resources,
		ts: Timestamp,
		deviceId: PublicDeviceId,
	},
	{
		title: 'Object update',
		description: 'Describes an update to a LwM2M object for a device.',
	},
)
