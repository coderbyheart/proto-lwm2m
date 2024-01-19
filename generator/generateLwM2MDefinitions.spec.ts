import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { definitions } from '../lwm2m/definitions.js'
import { LwM2MObjectID } from 'lwm2m/LwM2MObjectID'
import { ResourceType } from 'lwm2m/LWM2MObjectInfo'

void describe('generateLwM2MDefinitions()', () => {
	void it('should have generated definitions from the XML files', () => {
		assert.deepEqual(definitions[LwM2MObjectID.Geolocation_14201], {
			ObjectID: 14201,
			ObjectVersion: '1.0',
			Name: 'Geolocation',
			Description: 'Describes the geo location of a device',
			Resources: {
				0: {
					ResourceID: 0,
					Name: 'Latitude',
					Mandatory: true,
					Type: ResourceType.Float,
					Description:
						'The decimal notation of latitude, e.g. -43.5723 [World Geodetic System 1984].',
					Units: 'lat',
				},
				1: {
					ResourceID: 1,
					Name: 'Longitude',
					Mandatory: true,
					Type: ResourceType.Float,
					Description:
						'The decimal notation of longitude, e.g. 153.21760 [World Geodetic System 1984].',
					Units: 'lon',
				},
				2: {
					ResourceID: 2,
					Name: 'Altitude',
					Mandatory: false,
					Type: ResourceType.Float,
					Description:
						'The decimal notation of altitude in meters above sea level.',
					Units: 'm',
				},
				3: {
					ResourceID: 3,
					Name: 'Radius',
					Mandatory: false,
					Type: ResourceType.Float,
					Description:
						'The value in this resource indicates the radius of a circular area in meters. The circular area is used to describe uncertainty about a point for coordinates in a two-dimensional coordinate reference systems (CRS). The center point of a circular area is specified by using the Latitude and the Longitude Resources.',
					Units: 'm',
				},
				4: {
					ResourceID: 4,
					Name: 'Speed',
					Mandatory: false,
					Type: ResourceType.Float,
					Description: 'Speed is the time rate of change in position.',
					Units: 'm/s',
				},
				5: {
					ResourceID: 5,
					Name: 'Heading',
					Mandatory: false,
					Type: ResourceType.Float,
					Description: 'The angle of movement.',
					Units: 'degrees',
				},
				6: {
					ResourceID: 6,
					Name: 'Source',
					Mandatory: true,
					Type: ResourceType.String,
					Description:
						'The source of the geo location, e.g. GNSS, SCELL, MCELL, WIFI.',
					RangeEnumeration: 'GNSS,SCELL,MCELL,WIFI',
				},
				99: {
					ResourceID: 99,
					Name: 'Timestamp',
					Mandatory: true,
					Type: ResourceType.Time,
					Description:
						'The timestamp of when the location measurement was performed.',
				},
			},
		})
	})
})
