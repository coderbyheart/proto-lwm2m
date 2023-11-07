/**
 * Device information (14204)
 *
 * Details about the device's connection.
 */
export type DeviceInformation_14204 = {
	ObjectID: 14204
	ObjectVersion: '1.0'
	Instances: Record<
		number,
		{
			/**
			 * IMEI
			 *
			 * Board IMEI. Examples: 352656106111232.
			 */
			0: string
			/**
			 * SIM ICCID
			 *
			 * Examples: 89450421180216216095.
			 */
			1?: string
			/**
			 * Modem firmware version
			 *
			 * Examples: mfw_nrf9160_1.0.0.
			 */
			2: string
			/**
			 * Application firmware version
			 *
			 * Examples: v1.0.0-rc1-327-g6fc8c16b239f.
			 */
			3: string
			/**
			 * Board version
			 *
			 * Examples: thingy91_nrf9160.
			 */
			4: string
			/**
			 * Battery model
			 *
			 * Examples: LP302535, LP502540, LP803035.
			 */
			5?: string
			/**
			 * Timestamp (Time)
			 *
			 * The timestamp of when the measurement was performed.
			 */
			99: Date
		}
	>
}
