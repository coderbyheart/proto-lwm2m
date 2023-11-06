import type { LwM2MObject } from '../senml/senMLtoLwM2M'

/**
 * Environment (14205)
 *
 * Environment information.
 */
export type Environment_14205 = LwM2MObject & {
	ObjectID: 14205
	ObjectVersion: '1.0'
	Resources: {
		/**
		 * Temperature (C)
		 *
		 * Environmental temperature in Celsius. Examples: 23.5, -10.2.
		 */
		0?: number
		/**
		 * Humidity (%)
		 *
		 * Environmental humidity in percent. Examples: 44.2, 72.
		 */
		1?: number
		/**
		 * Atmoshperic pressure Pa
		 *
		 * Atmoshperic pressure in pascal. Examples: 1003.6, 977.
		 */
		2?: number
		/**
		 * Air Quality Index
		 *
		 * The Bosch BME680 sensor calculates an Air Quality Index. See
		 * https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme680-ds001.pdf
		 */
		10?: number
		/**
		 * Timestamp (Time)
		 *
		 * The timestamp of when the measurement was performed.
		 */
		99: Date
	}
}
