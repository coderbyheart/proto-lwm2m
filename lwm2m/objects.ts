import type { LwM2MResourceValue } from 'senml/senMLtoLwM2M.js'

export * from 'lwm2m/LwM2MObjectID.js'
export * from './14201.js'
export * from './14203.js'
export * from './14204.js'
export * from './14205.js'
export * from './14210.js'
export * from './14220.js'
export * from './14202.js'

export type LwM2MObject<
	ObjectDef extends {
		ObjectID: number
		ObjectVersion: string
		Resources: Record<number, LwM2MResourceValue | undefined>
	},
> = {
	ObjectID: ObjectDef['ObjectID']
	ObjectVersion: ObjectDef['ObjectVersion']
	Resources: ObjectDef['Resources']
}
