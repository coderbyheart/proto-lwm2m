/**
 * Create typebox defintion for object
 */
export const createObjectDefinition = ({
	objectId,
	objectVersion,

	resources,
	description,
}: {
	objectId: string
	objectVersion: string
	resources: string[]
	description: string
}): string =>
	`Type.Object({ObjectVersion: Type.String({examples:['${objectVersion}']}), ObjectID: Type.Number({examples:[${objectId}]}), Resources: Type.Object({${resources}})}, {description: '${description}'})`
