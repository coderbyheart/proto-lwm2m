import type { MeasurementType, SenMLType } from './SenMLSchema'
import { timestampResources } from '../lwm2m/timestampResources.js'
import { parseResourceId, type ResourceID } from './parseResourceId.js'
import { hasValue } from './hasValue.js'
import type { LwM2MObjectID } from 'lwm2m/LwM2MObjectID'

export type LwM2MResourceValue = string | number | boolean | Date
export type LwM2MObjectInstance = {
	ObjectID: LwM2MObjectID
	/**
	 * @default 0
	 */
	ObjectInstanceID?: number
	/**
	 * @default '1.0'
	 */
	ObjectVersion?: string
	/**
	 * Key range: 0..65534
	 */
	Resources: Record<number, LwM2MResourceValue>
}

const isInfoForDifferentInstance = (
	currentObject: LwM2MObjectInstance,
	resourceID: ResourceID,
	currentBaseTime: number,
): boolean => {
	if (currentObject === undefined) return true
	if (currentObject.ObjectID !== resourceID.ObjectID) return true
	if ((currentObject.ObjectInstanceID ?? 0) !== resourceID.ObjectInstanceID)
		return true
	const tsRes = timestampResources[resourceID.ObjectID]
	if (tsRes === undefined)
		throw new Error(`Unknown LwM2M Object ID: ${resourceID.ObjectID}!`)
	if (
		currentBaseTime !==
		(currentObject.Resources?.[tsRes] as Date | undefined)?.getTime()
	)
		return true
	return false
}

const getValue = (
	measurement: MeasurementType,
): string | number | boolean | undefined => {
	if ('bv' in measurement && !('v' in measurement)) return measurement.bv
	if ('bv' in measurement && 'v' in measurement)
		return measurement.bv + measurement.v
	if ('v' in measurement) return measurement.v
	if ('vs' in measurement) return measurement.vs
	if ('vb' in measurement) return measurement.vb
	if ('vd' in measurement) return measurement.vd
	return undefined
}
export const senMLtoLwM2M = (senML: SenMLType): Array<LwM2MObjectInstance> => {
	let currentBaseName: string = ''
	let currentBaseTime: number | undefined = undefined
	let currentObject: LwM2MObjectInstance | undefined = undefined
	const items: LwM2MObjectInstance[] = []

	for (const item of senML) {
		if ('bn' in item && item.bn !== undefined) currentBaseName = item.bn
		if ('bt' in item && item.bt !== undefined) currentBaseTime = item.bt
		if (!hasValue(item)) continue
		const itemResourceId = `${currentBaseName}${item.n ?? ''}/0`
		const resourceId = parseResourceId(itemResourceId)
		if (resourceId === null)
			throw new Error(`Invalid resource ID: ${itemResourceId}`)

		if (
			currentObject === undefined ||
			(currentBaseTime !== undefined &&
				isInfoForDifferentInstance(currentObject, resourceId, currentBaseTime))
		) {
			if (currentObject !== undefined) items.push(currentObject)
			const tsRes = timestampResources[resourceId.ObjectID]
			if (tsRes === undefined)
				throw new Error(`Unknown LwM2M Object ID: ${resourceId.ObjectID}!`)
			if (currentBaseTime === undefined)
				throw new Error(`No base time defined for object!`)
			currentObject = {
				ObjectID: resourceId.ObjectID,
				Resources: {
					[tsRes]: new Date(currentBaseTime),
				},
			}
			if (resourceId.ObjectInstanceID !== 0)
				currentObject.ObjectInstanceID = resourceId.ObjectInstanceID
			if ('blv' in item) currentObject.ObjectVersion = item.blv
		}
		if (currentObject?.Resources === undefined) continue
		const value = getValue(item)
		if (value !== undefined) {
			currentObject.Resources = {
				...currentObject.Resources,
				[item.n]: value,
			}
		}
	}
	if (currentObject !== undefined) items.push(currentObject)

	return items
}
