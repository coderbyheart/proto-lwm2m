import { Type, type Static } from '@sinclair/typebox'

const ResourceType = Type.Union([
	Type.Literal('String'),
	Type.Literal('Integer'),
	Type.Literal('Float'),
	Type.Literal('Boolean'),
	Type.Literal('Opaque'),
	Type.Literal('Time'),
])

export const RangeEnumerationRegExp =
	/^(?<min>-?[0-9]+(?:\.[0-9]+)?)\.\.(?<max>-?[0-9]+(?:\.[0-9]+)?)$/
const RangeEnumeration = Type.RegExp(RangeEnumerationRegExp, {
	title: 'RangeEnumeration',
})

export const LWM2MObjectDefinition = Type.Object(
	{
		Name: Type.String({ minLength: 1, examples: ['Location'] }),
		Description1: Type.String({
			minLength: 1,
			examples: [
				'This LwM2M Object provides a range of location telemetry related information which can be queried by the LwM2M Server.',
			],
		}),
		ObjectID: Type.RegExp(/^14[0-9]{3}$/),
		ObjectURN: Type.RegExp(/^urn:oma:lwm2m:x:14[0-9]{3}$/),
		LWM2MVersion: Type.Literal('1.1', {
			title: 'LwM2M version',
			description: 'Defaults to 1.1',
		}),
		ObjectVersion: Type.Optional(
			Type.String({
				minLength: 1,
				examples: ['1.1'],
				title: 'ObjectVersion',
				description: 'Defaults to 1.0',
			}),
		),
		MultipleInstances: Type.Literal('Multiple'),
		Mandatory: Type.Literal('Optional'),
		Resources: Type.Record(
			Type.Integer({ minimum: 0, maximum: 65534 }),
			Type.Object({
				Name: Type.String({ minLength: 1, examples: ['Latitude'] }),
				Operations: Type.Union([
					Type.Literal('R'),
					Type.Literal('W'),
					Type.Literal('RW'),
				]),
				MultipleInstances: Type.Literal('Single'),
				Mandatory: Type.Union([
					Type.Literal('Optional'),
					Type.Literal('Mandatory'),
				]),
				Type: ResourceType,
				RangeEnumeration: Type.Union([
					Type.String({ maxLength: 0, title: 'an empty string' }),
					RangeEnumeration,
				]),
				Units: Type.String({
					examples: ['lat'],
					title: 'Units',
				}),
				Description: Type.String({
					minLength: 1,
					examples: [
						'The decimal notation of latitude, e.g. -43.5723 [World Geodetic System 1984].',
					],
				}),
			}),
			{
				minProperties: 1,
				description: 'Defines the object resources as a map',
			},
		),
		Description2: Type.String(),
	},
	{
		description:
			'LwM2M Object definitions with additional limitations applied to suit the hello.nrfcloud.com/map use-case',
	},
)

export type LWM2MObjectDefinitionType = Static<typeof LWM2MObjectDefinition>
