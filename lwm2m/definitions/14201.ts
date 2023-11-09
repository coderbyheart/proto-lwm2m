import type { LwM2MObjectID } from './LwM2MObjectID'
import type { LwM2MObject } from './objects'

/**
 * Geolocation (14201)
 *
 * Describes the geo location of a device
 */
export type Geolocation_14201 = LwM2MObject<{
	ObjectID: LwM2MObjectID.Geolocation_14201
	ObjectVersion: '1.0'
	Resources: {
		/**
		 * Latitude (lat)
		 *
		 * The decimal notation of latitude, e.g. -43.5723 [World Geodetic
		 * System 1984].
		 */
		0: number
		/**
		 * Longitude (lon)
		 *
		 * The decimal notation of longitude, e.g. 153.21760 [World Geodetic
		 * System 1984].
		 */
		1: number
		/**
		 * Altitude (m)
		 *
		 * The decimal notation of altitude in meters above sea level.
		 */
		2?: number
		/**
		 * Radius (m)
		 *
		 * The value in this resource indicates the radius of a circular area in
		 * meters. The circular area is used to describe uncertainty about a
		 * point for coordinates in a two-dimensional coordinate reference
		 * systems (CRS). The center point of a circular area is specified by
		 * using the Latitude and the Longitude Resources.
		 */
		3?: number
		/**
		 * Speed (m/s)
		 *
		 * Speed is the time rate of change in position.
		 */
		4?: number
		/**
		 * Heading (degrees)
		 *
		 * The angle of movement.
		 */
		5?: number
		/**
		 * Source (GNSS,SCELL,MCELL,WIFI)
		 *
		 * The source of the geo location, e.g. GNSS, SCELL, MCELL, WIFI.
		 */
		6: string
		/**
		 * Timestamp (Time)
		 *
		 * The timestamp of when the location measurement was performed.
		 */
		99: Date
	}
}>
