import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { DeviceId, PublicDeviceId } from './DeviceId.js'

export const ShareDeviceRequest = Type.Object({
	'@context': Type.Literal(Context.shareDevice.request.toString()),
	id: PublicDeviceId,
	deviceId: DeviceId,
})
