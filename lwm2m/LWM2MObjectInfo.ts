import type { LwM2MObjectID } from './LwM2MObjectID.js'

/**
 * Provides information about the the LwM2M objects defined in this project.
 */
export type LWM2MObjectInfo = {
	ObjectID: LwM2MObjectID
	ObjectVersion: string
	Name: string
	Description: string
	Resources: Record<
		number,
		{
			ResourceID: number
			Name: string
			Mandatory: boolean
			Type: ResourceType
			Description: string // e.g. 'The decimal notation of latitude, e.g. -43.5723 [World Geodetic System 1984].'
			RangeEnumeration?: string // e.g. ''
			Units?: string // e.g. 'lat'
		}
	>
}

export enum ResourceType {
	String = 'String',
	Integer = 'Integer',
	Float = 'Float',
	Boolean = 'Boolean',
	Opaque = 'Opaque',
	Time = 'Time',
}
