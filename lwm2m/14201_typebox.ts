import { Type, type Static } from '@sinclair/typebox'
import type { LwM2MObject } from './LwM2MObject.js'
import { LwM2MObjectID } from './LwM2MObjectID.js'
/**
 * Geolocation (14201)
 *
 * Describes the geo location of a device
 */
export const Geolocation_14201_Schema = Type.Object(
	{
		ObjectID: Type.Literal(LwM2MObjectID.Geolocation_14201),
		ObjectVersion: Type.Literal('1.0'),
		Resources: Type.Object({
			0: Type.Number({
				title: 'Latitude (lat)',
				description:
					'The decimal notation of latitude, e.g. -43.5723 [World Geodetic System 1984].',
			}),
			1: Type.Number({
				title: 'Longitude (lon)',
				description:
					'The decimal notation of longitude, e.g. 153.21760 [World Geodetic System 1984].',
			}),
			2: Type.Optional(
				Type.Number({
					title: 'Altitude (m)',
					description:
						'The decimal notation of altitude in meters above sea level.',
				}),
			),
			3: Type.Optional(
				Type.Number({
					title: 'Radius (m)',
					description:
						'The value in this resource indicates the radius of a circular area in meters. The circular area is used to describe uncertainty about a point for coordinates in a two-dimensional coordinate reference systems (CRS). The center point of a circular area is specified by using the Latitude and the Longitude Resources.',
				}),
			),
			4: Type.Optional(
				Type.Number({
					title: 'Speed (m/s)',
					description: 'Speed is the time rate of change in position.',
				}),
			),
			5: Type.Optional(
				Type.Number({
					title: 'Heading (degrees)',
					description: 'The angle of movement.',
				}),
			),
			6: Type.String({
				title: 'Source',
				description:
					'The source of the geo location, e.g. GNSS, SCELL, MCELL, WIFI.',
			}),
			99: Type.Date({
				title: 'Timestamp',
				description:
					'The timestamp of when the location measurement was performed.',
			}),
		}),
	},
	{ description: 'Describes the geo location of a device' },
)
export type Geolocation_14201 = LwM2MObject<
	Static<typeof Geolocation_14201_Schema>
>
