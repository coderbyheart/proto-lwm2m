import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { PublicDeviceId } from './DeviceId.js'
import { LwM2MObjectID, models } from '@hello.nrfcloud.com/proto-map'

export const LwM2MObjectInstance = Type.Object({
	ObjectID: Type.Enum(LwM2MObjectID, {
		description:
			'The LwM2M Object IDs defined in @hello.nrfcloud.com/proto-map',
	}),
	ObjectVersion: Type.Optional(
		Type.String({
			pattern: '^[0-9]+.[0-9]+$',
			default: '1.0',
			description:
				"The Object Version of an Object is composed of 2 digits separated by a dot '.'.\nSee https://www.openmobilealliance.org/release/LightweightM2M/V1_1_1-20190617-A/OMA-TS-LightweightM2M_Core-V1_1_1-20190617-A.pdf Section 7.2.2",
		}),
	),
	ObjectInstanceID: Type.Optional(
		Type.Integer({
			minimum: 0,
			default: 0,
		}),
	),
	Resources: Type.Record(
		Type.Integer({ minimum: 0 }),
		Type.Union([Type.String(), Type.Number(), Type.Boolean()]),
	),
})

export const Model = Type.Union(
	Object.keys(models).map((s) => Type.Literal(s)),
	{
		title: 'Model',
		description:
			'Must be one of the models defined in @hello.nrfcloud.com/proto-map',
	},
)

export const PublicDevice = Type.Object(
	{
		'@context': Type.Literal(Context.device.toString()),
		id: PublicDeviceId,
		model: Model,
		state: Type.Optional(Type.Array(LwM2MObjectInstance)),
	},
	{ title: 'Public device', description: 'A device that is publicly visible.' },
)

export const Devices = Type.Object({
	'@context': Type.Literal(Context.devices.toString()),
	devices: Type.Array(PublicDevice),
})
