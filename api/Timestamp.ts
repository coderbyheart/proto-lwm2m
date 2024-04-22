import { Type } from '@sinclair/typebox'

export const Timestamp = Type.RegExp(
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
	{
		title: 'Time when the update was received, formatted as ISO 8601',
		examples: ['2024-04-19T08:45:00.000Z'],
	},
)
