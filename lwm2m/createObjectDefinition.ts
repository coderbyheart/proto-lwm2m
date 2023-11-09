/**
 * Create typebox defintion for object
 */
export const createObjectDefinition = ({
	objectId,
	objectVersion,
	multiple,
	mandatory,
	resources,
	description,
}: {
	objectId: string
	objectVersion: string
	multiple: string
	mandatory: string
	resources: string[]
	description: string
}): string => {
	let object = `Type.Object({ObjectID: ${objectId}, ObjectVersion: '${objectVersion}', ${resources}}, {description: '${description}'})`

	if (multiple === 'Multiple')
		object = `Type.Array(
		${object}
	)`

	if (mandatory === 'Optional')
		object = `Type.Optional(
		${object}
	)`

	return object
}
