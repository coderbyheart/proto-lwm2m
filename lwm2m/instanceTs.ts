import type { LwM2MObjectInstance } from './LwM2MObjectInstance.js'
import { definitions } from './definitions.js'
import { timestampResources } from './timestampResources.js'

/**
 * Returns the timestamp of the instance
 *
 * The timestamp is s signed integer representing
 * the number of seconds since Jan 1, 1970 in the
 * UTC time zone.
 */
export const instanceTs = (instance: LwM2MObjectInstance): number => {
	const definition = definitions[instance.ObjectID]
	const tsResourceId = timestampResources.get(definition.ObjectID) as number // All registered objects must have a timestamp resource
	return instance.Resources[tsResourceId] as number
}

/**
 * Returns the timestamp of the instance as a Date object
 */
export const instanceTsAsDate = (instance: LwM2MObjectInstance): Date =>
	new Date(instanceTs(instance) * 1000)
