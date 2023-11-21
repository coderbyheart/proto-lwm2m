import { Type, type Static } from '@sinclair/typebox'
import type { LwM2MObject } from './objects.js'
import { LwM2MObjectID } from './LwM2MObjectID.js'
/**
 * Battery and Power (14202)
 *
 * Information about the battery and power status of the device.
 */
export const BatteryAndPower_14202 = Type.Object(
	{
		ObjectID: Type.Literal(LwM2MObjectID.BatteryAndPower_14202),
		ObjectVersion: Type.Literal('1.0'),
		Resources: Type.Object({
			0: Type.Optional(
				Type.Integer({
					title: 'State of charge (%)',
					description: 'State of charge in percent. Examples: 23, 1, 100.',
				}),
			),
			1: Type.Optional(
				Type.Number({
					title: 'Voltage (V)',
					description: 'Battery voltage in Volt. Examples: 2.754, 3.3.',
				}),
			),
			2: Type.Optional(
				Type.Number({
					title: 'Charge current (mA)',
					description: 'Charge current in mA. Examples: 429, -244.',
				}),
			),
			3: Type.Optional(
				Type.Number({
					title: 'Battery temperature (C)',
					description:
						'Battery temperature in Celsius. Examples: 21.7, 23.123.',
				}),
			),
			4: Type.Optional(
				Type.Integer({
					title: 'Time to full (s)',
					description: 'Time to full in seconds. Examples: 4652.',
				}),
			),
			5: Type.Optional(
				Type.Integer({
					title: 'Time to empty (s)',
					description: 'Time to empty in seconds. Examples: 4652.',
				}),
			),
			99: Type.Date({
				title: 'Timestamp',
				description: 'The timestamp of when the measurement was performed.',
			}),
		}),
	},
	{
		description:
			'Information about the battery and power status of the device.',
	},
)
export type BatteryAndPower_14202_Type = LwM2MObject<
	Static<typeof BatteryAndPower_14202>
>
