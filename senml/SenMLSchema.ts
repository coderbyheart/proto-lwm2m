import { Type, type Static } from '@sinclair/typebox'

const ResourceIDPart = Type.RegExp(/^[0-9/]+$/, {
	title: 'ResourceIDPart',
	description:
		'Combines `bn` and `n` to a fully qualified resource identifier in the form of `/<object ID>/<object instance ID>/<resource ID>/0`. (Multiple resource instances are not supported right now.).',
	examples: ['/', '/14201/0/', '5'],
})
const BaseValue = Type.Number({ title: 'Base Value' })
const Value = Type.Number({ title: 'Value' })
const Time = Type.Integer({ minimum: 0, title: 'Time' })

/**
 * Defines a SenML type with some unsupported elements removed: Sum, Base Sum, Update Time
 *
 * @see https://datatracker.ietf.org/doc/html/rfc8428
 */
export const Measurement = Type.Intersect(
	[
		Type.Union([
			Type.Object({
				n: ResourceIDPart,
			}),
			Type.Object({
				bn: ResourceIDPart,
				n: ResourceIDPart,
				blv: Type.String({
					minLength: 1,
					description: 'The LwM2M object version used',
					default: '1.0',
				}),
				bt: Type.Optional(Time),
			}),
			Type.Object({
				bn: ResourceIDPart,
			}),
		]),
		// Value combinations
		Type.Union([
			Type.Union([
				Type.Object({
					bv: BaseValue,
				}),
				Type.Object({
					bv: BaseValue,
					v: Value,
				}),
				Type.Object({
					// Value can be undefined, if it is not mandatory
					v: Type.Optional(Value),
				}),
			]),
			Type.Object({
				vs: Type.String({ minLength: 1, title: 'String Value' }),
			}),
			Type.Object({
				vb: Type.Boolean({ title: 'Boolean Value' }),
			}),
			Type.Object({
				vd: Type.String({
					title: 'Data Value.',
					description:
						'Octets in the Data Value are base64 encoded with the URL-safe alphabet as defined in Section 5 of [RFC4648], with padding omitted.',
				}),
			}),
		]),
	],
	{
		description:
			'SenML schema for conversion results. This is limited to properties useful for the hello.nrfcloud.com/map application.',
	},
)

export const SenML = Type.Array(Measurement, { minItems: 1 })

export type SenMLType = Static<typeof SenML>
export type MeasurementType = Static<typeof Measurement>
