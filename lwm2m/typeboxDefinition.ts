import { Type } from '@sinclair/typebox'

/**
 * Typebox definition of object 14201
 */
export const typeboxDefinition = (id: number) => {
	return Type.Object(
		{
			//Name: Type.String({ examples: ['Geolocation'] }),
			//ObjectURN: Type.String({ examples: ['urn:oma:lwm2m:oma:14201'] }),
			//LWM2MVersion: Type.Number({ examples: [1.1] }),
			ObjectVersion: Type.String({ examples: ['1.1'] }),
			Resources: Type.Object({
				0: Type.Number({
					$id: '0',
					title: 'Latitude',
					description:
						'The decimal notation of latitude, e.g. -43.5723 [World Geodetic System 1984].',
				}),
				1: Type.Number({
					$id: '1',
					title: 'Longitude',
					description:
						'The decimal notation of longitude, e.g. 153.21760 [World Geodetic System 1984].',
				}),
				2: Type.Optional(
					Type.Number({
						$id: '2',
						title: 'Altitude',
						description:
							'The decimal notation of altitude in meters above sea level.',
					}),
				),
				3: Type.Optional(
					Type.Number({
						$id: '3',
						title: 'Radius',
						description:
							'The value in this resource indicates the radius of a circular area in meters. The circular area is used to describe uncertainty about a point for coordinates in a two-dimensional coordinate reference systems (CRS). The center point of a circular area is specified by using the Latitude and the Longitude Resources.',
					}),
				),
				4: Type.Optional(
					Type.Number({
						$id: '4',
						title: 'Speed',
						description: 'Speed is the time rate of change in position.',
					}),
				),
				5: Type.Optional(
					Type.Number({
						$id: '5',
						title: 'Heading',
						description: 'The angle of movement.',
					}),
				),
				9: Type.Number({
					$id: '9',
					title: 'Timestamp',
					description:
						'The timestamp of when the location measurement was performed.',
					minimum: 1234567890123,
					examples: [1584533788029],
				}),
			}),
		},
		{
			description: '',
		},
	)
}