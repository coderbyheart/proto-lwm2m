import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { DeviceId, PublicDeviceId } from './DeviceId.js'

export const DeviceCredentials = Type.Object(
	{
		'@context': Type.Literal(Context.deviceCredentials.toString()),
		id: PublicDeviceId,
		deviceId: DeviceId,
		credentials: Type.Object({
			privateKey: Type.String({
				minLength: 1,
				title: 'Private Key',
				description: 'PEM encoded private key',
			}),
			certificate: Type.String({
				minLength: 1,
				title: 'Certificate',
				description: 'PEM encoded certificate',
			}),
		}),
	},
	{
		title: 'Device credentials',
		description: 'contains credentials for custom devices',
	},
)
