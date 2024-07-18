import { Type } from '@sinclair/typebox'
import { DeviceId, PublicDeviceId } from './DeviceId.js'
import { Model } from './Devices.js'
import { Context } from './Context.js'

export const DeviceJWT = Type.Object(
	{
		'@context': Type.Literal(Context.deviceJWT.toString()),
		id: PublicDeviceId,
		deviceId: DeviceId,
		model: Model,
		jwt: Type.String({
			title: 'JWT',
			minLength: 5,
			description: 'The JWT for a publicly shared device.',
			examples: [
				'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6ImEyMGM0NzZkLTVlZjUtNDE1NS1iODllLTdkZWRiMzJjODVhNCJ9.eyJpZCI6ImQ0OThkNzZhLWQ0ZjktNGQ4YS1iMTYwLTNlODA5NGMzOGNmYSIsImRldmljZUlkIjoidGFsbXVkaWMtb3ZlcnJhdGUtcGVuc2l2ZWQiLCJtb2RlbCI6InRoaW5neTkxeCIsImlhdCI6MTcyMTI4NjA1NywiZXhwIjoxNzIxMjg5NjU3LCJhdWQiOiJoZWxsby5ucmZjbG91ZC5jb20ifQ.Afn2Vj7V4boatn3Dwf4yZCTh09lTpfAEfsaX2uTZv0z2EvcWVH3CeVVsEmvCtDb8mnpvxJcj88-l9PlJqShKzZF5AShz6Ps0Igkzm0PueGjK-nq12I8DTgraT6fdSB3v5ALzLC9ozwyuPN7kJDLMHMHkO3j24sveBvFLg2BLsharSRBN',
			],
		}),
	},
	{ title: 'DeviceJWT', description: 'The JWT for a publicly shared device.' },
)
