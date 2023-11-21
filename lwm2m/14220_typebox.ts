import { Type, type Static } from '@sinclair/typebox'
import type { LwM2MObject } from './LwM2MObject.js'
import { LwM2MObjectID } from './LwM2MObjectID.js'
/**
 * Button press (14220)
 *
 * Describes a button press event.
 */
export const ButtonPress_14220_Schema = Type.Object(
	{
		ObjectID: Type.Literal(LwM2MObjectID.ButtonPress_14220),
		ObjectVersion: Type.Literal('1.0'),
		Resources: Type.Object({
			0: Type.Integer({
				title: 'Button ID',
				description: 'The ID of the button that was pressed. Examples: 1, 2.',
			}),
			99: Type.Date({
				title: 'Timestamp',
				description: 'The timestamp of when the button was pressed.',
			}),
		}),
	},
	{ description: 'Describes a button press event.' },
)
export type ButtonPress_14220 = LwM2MObject<
	Static<typeof ButtonPress_14220_Schema>
>
