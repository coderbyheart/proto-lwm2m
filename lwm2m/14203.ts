import type { LwM2MObjectID } from './LwM2MObjectID'
import type { LwM2MObject } from './LwM2MObject'

/**
 * Connection Information (14203)
 *
 * Details about the device's connection.
 */
export type ConnectionInformation_14203 = LwM2MObject<{
	ObjectID: LwM2MObjectID.ConnectionInformation_14203
	ObjectVersion: '1.0'
	Resources: {
		/**
		 * Network mode
		 *
		 * Examples: LTE-M, NB-IoT.
		 */
		0?: string
		/**
		 * Band
		 *
		 * E-UTRA Absolute Radio Frequency Channel Number (EARFCN) of the
		 * current cell where the EARFCN is as defined in 3GPP TS 36.101. LTE
		 * carrier channel number for unique identification of LTE band and
		 * carrier frequency. Examples: 262143
		 */
		1?: number
		/**
		 * RSRP (dBm)
		 *
		 * Reference Signal Received Power (RSRP). The average power level in
		 * dBm received from a single reference signal in an LTE (Long-term
		 * Evolution) network. Typically this value ranges from -140 to -40 dBm.
		 * Examples: -97, -104.
		 */
		2?: number
		/**
		 * Area
		 *
		 * Area code. Examples: 12
		 */
		3?: number
		/**
		 * Cell
		 *
		 * The cell ID the User Equipment (UE) is camped on. 4-byte Evolved
		 * Terrestrial Radio Access Network (E-UTRAN) cell ID. Examples:
		 * 33703719
		 */
		4?: number
		/**
		 * Mobile country code and mobile network code
		 *
		 * Examples: 24202, 310410
		 */
		5?: number
		/**
		 * IP address
		 * Examples: 10.81.183.99, 2001:0db8:85a3:0000:0000:8a2e:0370:7334,
		 * 2001:db8:85a3::8a2e:370:7334
		 */
		6?: string
		/**
		 * Energy Estimate
		 *
		 * The %CONEVAL AT command returns amongst other data the energy
		 * estimate: Relative estimated energy consumption of data transmission
		 * compared to nominal consumption. A higher value means smaller energy
		 * consumption. 5: Difficulties in setting up connections. Maximum
		 * number of repetitions might be needed for data. 6: Poor conditions.
		 * Setting up a connection might require retries and a higher number of
		 * repetitions for data. 7: Normal conditions for cIoT device. No
		 * repetitions for data or only a few repetitions in the worst case. 8:
		 * Good conditions. Possibly very good conditions for small amounts of
		 * data. 9: Very good conditions. Efficient data transfer estimated also
		 * for larger amounts of data. Examples: 5, 7
		 */
		11?: number
		/**
		 * Timestamp (Time)
		 *
		 * The timestamp of when the measurement was performed.
		 */
		99: Date
	}
}>
