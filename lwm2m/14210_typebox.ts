import { Type, type Static } from '@sinclair/typebox'
import type { LwM2MObject } from './LwM2MObject.js'
import { LwM2MObjectID } from './LwM2MObjectID.js'
/**
 * Solar charge (14210)
 *
 * Measurements from the solar shield.
 */
export const SolarCharge_14210 = Type.Object(
	{
		ObjectID: Type.Literal(LwM2MObjectID.SolarCharge_14210),
		ObjectVersion: Type.Literal('1.0'),
		Resources: Type.Object({
			0: Type.Number({
				title: 'Gain (mA)',
				description:
					'The current gain from the solar shield, measured in mA. Example: 3.123, -0.0032.',
			}),
			1: Type.Optional(
				Type.Number({
					title: 'Voltage (V)',
					description: 'Battery voltage in Volt. Examples: 2.754, 3.3.',
				}),
			),
			99: Type.Date({
				title: 'Timestamp',
				description: 'The timestamp of when the measurement was performed.',
			}),
		}),
	},
	{ description: 'Measurements from the solar shield.' },
)
export type SolarCharge_14210_Type = LwM2MObject<
	Static<typeof SolarCharge_14210>
>
