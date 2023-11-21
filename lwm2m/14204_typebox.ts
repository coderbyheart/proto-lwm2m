import { Type, type Static } from '@sinclair/typebox'
import type { LwM2MObject } from './LwM2MObject.js'
import { LwM2MObjectID } from './LwM2MObjectID.js'
/**
 * Device information (14204)
 *
 * Details about the device's connection.
 */
export const DeviceInformation_14204 = Type.Object(
	{
		ObjectID: Type.Literal(LwM2MObjectID.DeviceInformation_14204),
		ObjectVersion: Type.Literal('1.0'),
		Resources: Type.Object({
			0: Type.String({
				title: 'IMEI',
				description: 'Board IMEI. Examples: 352656106111232.',
			}),
			1: Type.Optional(
				Type.String({
					title: 'SIM ICCID',
					description: 'Examples: 89450421180216216095.',
				}),
			),
			2: Type.String({
				title: 'Modem firmware version',
				description: 'Examples: mfw_nrf9160_1.0.0.',
			}),
			3: Type.String({
				title: 'Application firmware version',
				description: 'Examples: v1.0.0-rc1-327-g6fc8c16b239f.',
			}),
			4: Type.String({
				title: 'Board version',
				description: 'Examples: thingy91_nrf9160.',
			}),
			5: Type.Optional(
				Type.String({
					title: 'Battery model',
					description: 'Examples: LP302535, LP502540, LP803035.',
				}),
			),
			99: Type.Date({
				title: 'Timestamp',
				description: 'The timestamp of when the measurement was performed.',
			}),
		}),
	},
	{ description: "Details about the device's connection." },
)
export type DeviceInformation_14204_Type = LwM2MObject<
	Static<typeof DeviceInformation_14204>
>
