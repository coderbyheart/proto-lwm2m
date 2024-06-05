import type { LwM2MObjectInstance } from './LwM2MObjectInstance.js'
import { definitions } from './definitions.js'
import { timestampResources } from './timestampResources.js'

export const instanceTs = (instance: LwM2MObjectInstance): number => {
	const definition = definitions[instance.ObjectID]
	const tsResourceId = timestampResources.get(definition.ObjectID) as number // All registered objects must have a timestamp resource
	return instance.Resources[tsResourceId] as number
}
