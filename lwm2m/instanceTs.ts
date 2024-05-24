import type { LwM2MObjectInstance } from './LwM2MObjectInstance.js'
import { definitions } from './definitions.js'
import { timestampResources } from './timestampResources.js'

export const instanceTs = (instance: LwM2MObjectInstance): Date => {
	const definition = definitions[instance.ObjectID]
	const tsResourceId = timestampResources[definition.ObjectID] as number // All registered objects must have a timestamp resource
	const ts = instance.Resources[tsResourceId] as string
	return new Date(ts)
}
