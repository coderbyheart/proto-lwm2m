import type { LwM2MObjectID } from './LwM2MObjectID'
import type { LwM2MObject } from './LwM2MObject'

/**
 * Battery and Power (14202)
 *
 * Information about the battery and power status of the device.
 */
export type BatteryAndPower_14202 = LwM2MObject<{
	ObjectID: LwM2MObjectID.BatteryAndPower_14202
	ObjectVersion: '1.0'
	Resources: {
		/**
		 * State of charge (%, 0-100)
		 *
		 * State of charge in percent. Examples: 23, 1, 100.
		 */
		0?: number
		/**
		 * Voltage (V)
		 *
		 * CDATA[Battery voltage in Volt. Examples: 2.754, 3.3.
		 */
		1: number
		/**
		 * Charge current (mA)
		 *
		 * Charge current in mA. Examples: 429, -244.
		 */
		2?: number
		/**
		 * Battery temperature (C)
		 *
		 * Battery temperature in Celsius. Examples: 21.7, 23.123.
		 */
		3?: number
		/**
		 * Time to full (s)
		 *
		 * Time to full in seconds. Examples: 4652.
		 */
		4?: number
		/**
		 * Time to empty (s)
		 *
		 * Time to empty in seconds. Examples: 4652.
		 */
		5?: number
		/**
		 * Timestamp (Time)
		 *
		 * The timestamp of when the measurement was performed.
		 */
		99: Date
	}
}>
