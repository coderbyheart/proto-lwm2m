import { writeFile } from 'fs/promises'
import { Type, type TSchema } from '@sinclair/typebox'
import { fromXML2JSON } from './fromXML2JSON.js'
import path from 'node:path'
import {
	LwM2MType,
	createResourceDefinition,
} from './createResourceDefinition.js'
import { createObjectDefinition } from './createObjectDefinition.js'

/**
 * Create Typebox definition for object 14201
 */
export const createTypeboxType = async (id: number): Promise<TSchema> => {
	// from xml to json
	const obj = await fromXML2JSON(id)

	const objId = obj.ObjectID[0]?.toString() ?? ''
	const name = obj.Name[0]?.toString() ?? ''

	const resources = obj.Resources[0].Item.map((resource) => {
		return createResourceDefinition({
			id: resource.$.ID,
			name: resource.Name[0] ?? '',
			multiple: resource.MultipleInstances[0],
			mandatory: resource.Mandatory[0],
			description: resource.Description[0] ?? '',
			type: resource.Type[0] ?? ('' as LwM2MType),
		})
	})

	const object = createObjectDefinition({
		objectId: objId,
		objectVersion:
			obj.ObjectVersion !== undefined
				? (obj.ObjectVersion[0] as string)
				: '1.0',
		resources,
		description: obj.Description1[0] ?? '',
	})

	await writeTypeboxDefinition({
		objectId: objId,
		name,
		objectDefinition: object,
	})

	return definition
}

/**
 * Create new file with typebox definition
 *
 * file created path: lwm2m/object-id.ts
 */
const writeTypeboxDefinition = async ({
	objectId,
	name,
	objectDefinition,
}: {
	objectId: string
	name: string
	objectDefinition: string
}) => {
	const importTypebox = `import { Type } from "@sinclair/typebox";`
	const typeBoxDeclaration = `export const ${name}_${objectId} = ${objectDefinition}`
	const LwM2MType = `${importTypebox} ${typeBoxDeclaration}`
	const baseDir = process.cwd()
	const subDir = (...tree: string[]): string => path.join(baseDir, ...tree)
	await writeFile(subDir('lwm2m', `${objectId}-expected.ts`), LwM2MType)
}

/**
 * expected result
 */
const definition = Type.Object(
	{
		ObjectVersion: Type.String({ examples: ['1.0'] }),
		ObjectID: Type.Number({ examples: [14201] }),
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
			6: Type.String({
				$id: '6',
				title: 'Source',
				description:
					'The source of the geo location, e.g. GNSS, SCELL, MCELL, WIFI.',
			}),
			99: Type.Date({
				$id: '99',
				title: 'Timestamp',
				description:
					'The timestamp of when the location measurement was performed.',
			}),
		}),
	},
	{ description: 'Describes the geo location of a device' },
)
