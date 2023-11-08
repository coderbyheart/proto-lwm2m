/**
 * The LwM2M Object IDs defined in this repo.
 */
export enum LwM2MObjectID {
	/**
	 * Geolocation (14201)
	 *
	 * Describes the geo location of a device
	 */
	Geolocation_14201 = 14201,
	/**
	 * Connection information (14203)
	 *
	 * Details about the device's connection.
	 */
	ConnectionInformation_14203 = 14203,
	/**
	 * Device information (14204)
	 *
	 * Details about the device's connection.
	 */
	DeviceInformation_14204 = 14204,
	/**
	 * Environment (14205)
	 *
	 * Environment information.
	 */
	Environment_14205 = 14205,
	/**
	 * Solar charge (14210)
	 *
	 * Measurements from the solar shield.
	 */
	SolarCharge_14210 = 14210,
	/**
	 * Button press (14220)
	 *
	 * Describes a button press event.
	 */
	ButtonPress_14220 = 14220,
	/**
	 * Battery and Power (14202)
	 *
	 * Information about the battery and power status of the device.
	 */
	BatteryAndPower_14202 = 14202,
}
