import type { LwM2MObject } from './LwM2MObject.js'
import { isLwM2MObject } from './validation.js'
import { LwM2MObjectID } from './LwM2MObjectID.js'
import type { LwM2MResourceValue } from '../senml/senMLtoLwM2M.js'

export const validate =
	(
		validators: Map<
			LwM2MObjectID,
			(o: unknown, onError?: (error: Error) => void) => boolean
		>,
	) =>
	(
		o: unknown,
		onError?: (error: Error) => void,
	): o is LwM2MObject<{
		ObjectID: LwM2MObjectID
		ObjectVersion: string
		Resources: Record<number, LwM2MResourceValue | undefined>
	}> => {
		if (!isLwM2MObject(o, onError)) {
			return false
		}
		const validator = validators.get(o.ObjectID)
		if (validator === undefined) {
			onError?.(new Error(`No validator defined for ObjectID: ${o.ObjectID}!`))
			return false
		}
		return validator(o, onError)
	}
