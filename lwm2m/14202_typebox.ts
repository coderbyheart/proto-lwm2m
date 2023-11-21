import { Type } from '@sinclair/typebox'
/**
 * Battery and Power (14202)
 *
 * Information about the battery and power status of the device.
 */
export const BatteryandPower_14202 = Type.Object(
	{
		ObjectVersion: Type.Optional(Type.String({ examples: ['1.0'] })),
		ObjectID: Type.Number({ examples: [14202] }),
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
