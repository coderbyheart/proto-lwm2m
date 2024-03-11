import type { SenMLType } from './SenMLSchema'
import { instanceTs } from '../lwm2m/instanceTs.js'
import type { LwM2MObjectInstance, LwM2MResourceValue } from './senMLtoLwM2M'
import { timestampResources } from '../lwm2m/timestampResources.js'
import { definitions } from '../lwm2m/definitions.js'
import { ResourceType, type LWM2MObjectInfo } from '../lwm2m/LWM2MObjectInfo.js'

/**
 * Convert LwM2M Object Instances to senML
 */
export const lwm2mToSenML = (
	lwm2m: Array<LwM2MObjectInstance<any>>,
): SenMLType =>
	lwm2m
		.map(asSenML)
		.flat()
		.filter((v) => v !== null) as SenMLType

const asSenML = (lwm2m: LwM2MObjectInstance<any>): SenMLType | null => {
	const def = definitions[lwm2m.ObjectID]
	const i = instanceTs(lwm2m)
	const tsResourceId = timestampResources[lwm2m.ObjectID] as number // All registered objects must have a timestamp resource
	const [first, ...rest] = Object.entries({
		...lwm2m.Resources,
		[tsResourceId]: undefined,
	})
		// Filter out undefined values (and timestamp resource)
		.filter((r): r is [string, LwM2MResourceValue] => r[1] !== undefined)

	if (first === undefined) return null
	return [
		{
			bn: `/${lwm2m.ObjectID}/${lwm2m.ObjectInstanceID ?? 0}/`,
			n: first[0],
			[toKey(def, parseInt(first[0], 10))]: first[1],
			bt: i.getTime(),
		},
		...rest.map((r) => ({
			n: r[0],
			[toKey(def, parseInt(r[0], 10))]: r[1],
		})),
	]
}

const toKey = (def: LWM2MObjectInfo, resourceId: number) => {
	switch (def.Resources[resourceId]?.Type) {
		case ResourceType.String:
			return 'vs'
		case ResourceType.Boolean:
			return 'vb'
		case ResourceType.Float:
		case ResourceType.Integer:
		case ResourceType.Time:
			return 'v'
		case ResourceType.Opaque:
			return 'vd'
		default:
			throw new Error(
				`Unknown ResourceID ${resourceId} for LwM2M Object ${def.ObjectID}!`,
			)
	}
}
