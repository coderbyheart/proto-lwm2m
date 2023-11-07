/**
 * Solar charge (14210)
 *
 * Measurements from the solar shield.
 */
export type SolarCharge_14210 = {
	ObjectID: 14210
	ObjectVersion: '1.0'
	Resources: {
		/**
		 * Gain (mA)
		 *
		 * The current gain from the solar shield, measured in mA. Example: 3.123, -0.0032.
		 */
		0: number
		/**
		 * Voltage (V)
		 *
		 * CDATA[Battery voltage in Volt. Examples: 2.754, 3.3.
		 */
		1?: number
		/**
		 * Timestamp (Time)
		 *
		 * The timestamp of when the measurement was performed.
		 */
		99: Date
	}
}
