import type { LwM2MObject } from '../senml/senMLtoLwM2M'

/**
 * Button press (14220)
 *
 * Describes a button press event.
 */
export type ButtonPress_14220 = LwM2MObject & {
	ObjectID: 14220
	ObjectVersion: '1.0'
	Resources: {
		/**
		 * Button ID
		 *
		 * The ID of the button that was pressed. Examples: 1, 2.
		 */
		0: number
		/**
		 * Timestamp (Time)
		 *
		 * The timestamp of when the button was pressed.
		 */
		99: Date
	}
}
