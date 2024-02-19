import type { LwM2MResourceValue } from '../senml/senMLtoLwM2M.js'
import { LwM2MObjectIDs, type LwM2MObjectID } from './LwM2MObjectID.js'

export const isLwM2MObject = (
	object: unknown,
	onError?: (error: Error) => void,
): object is {
	ObjectID: LwM2MObjectID
	/**
	 * The Object Version of an Object is composed of 2 digits separated by a dot '.'
	 *
	 * @see https://www.openmobilealliance.org/release/LightweightM2M/V1_1_1-20190617-A/OMA-TS-LightweightM2M_Core-V1_1_1-20190617-A.pdf Section 7.2.2
	 *
	 * @default 1.0
	 */
	ObjectVersion?: string
	Resources: Record<number, LwM2MResourceValue>
} => {
	const error = (message: string) => {
		onError?.(new Error(message))
		return false
	}
	// Must be an object
	if (typeof object !== 'object' || object === null)
		return error(`Not an object`)
	// Must have valid ObjectID
	if (
		!('ObjectID' in object) ||
		typeof object.ObjectID !== 'number' ||
		object.ObjectID < 14200 ||
		object.ObjectID > 15000 ||
		LwM2MObjectIDs.includes(object.ObjectID) === false
	)
		return error(
			`Not an valid Object ID: ${JSON.stringify((object as any).ObjectID)}`,
		)
	// ObjectVersion must be valid
	if ('ObjectVersion' in object) {
		if (
			typeof object.ObjectVersion !== 'string' ||
			!/^\d+\.\d+$/.test(object.ObjectVersion)
		)
			return error(`Invalid ObjectVersion`)
	}
	// Must have valid resources
	if (
		!('Resources' in object) ||
		typeof object.Resources !== 'object' ||
		object.Resources === null
	)
		return error(`Resources must be an object`)
	// All keys must be numbers
	if (
		(Object.keys(object.Resources).find((k) => /[^\d]/.test(k))?.length ?? 0) >
		0
	)
		return error(`All resource IDs must be a number`)
	// All values must be number, string, boolean, or Date
	for (const v of Object.values(object.Resources)) {
		if (typeof v === 'string') continue
		if (typeof v === 'boolean') continue
		if (typeof v === 'number') continue
		if (typeof v === 'object' && v instanceof Date) continue
		return error(`Invalid value type ${typeof v}`)
	}
	return true
}

export const validate =
	(
		ObjectID: LwM2MObjectID,
		ObjectVersion: string,
		Resources: Record<number, (r: unknown) => boolean>,
	) =>
	(o: unknown, onError?: (error: Error) => void): boolean => {
		const error = (message: string) => {
			onError?.(new Error(message))
			return false
		}
		if (!isLwM2MObject(o, onError)) return false
		if (o.ObjectID !== ObjectID)
			return error(
				`Given Object ID ${o.ObjectID} does not match expected ${ObjectID}`,
			)
		if ((o.ObjectVersion ?? '1.0') !== ObjectVersion)
			return error(
				`Given Object version ${o.ObjectVersion} does not match expected ${ObjectVersion}`,
			)
		return Object.entries(Resources).reduce(
			(allValid, [ResourceID, validator]) => {
				if (!allValid) return false
				if (validator(o.Resources[parseInt(ResourceID, 10)]) === false) {
					return error(`Resource ${ResourceID} is invalid.`)
				}
				return allValid
			},
			true,
		)
	}

export const NumberResource = (r: unknown): r is number => typeof r === 'number'
export const StringResource = (r: unknown): r is string => typeof r === 'string'
export const DateResource = (r: unknown): r is Date =>
	typeof r === 'object' && r instanceof Date
export const BooleanResource = (r: unknown): r is boolean =>
	typeof r === 'boolean'

export const OptionalResource =
	(
		validator:
			| typeof NumberResource
			| typeof StringResource
			| typeof DateResource
			| typeof BooleanResource,
	) =>
	(r: unknown): boolean =>
		r === undefined ? true : validator(r)

export const isLwM2MObjectID = (o: unknown): o is LwM2MObjectID =>
	typeof o === 'number' && LwM2MObjectIDs.includes(o)
