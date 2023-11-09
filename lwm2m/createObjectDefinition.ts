/**
 * Create typebox defintion for object
 */
export const createObjectDefinition = ({
	multiple,
	mandatory,
	resources,
	description,
}: {
	multiple: string
	mandatory: string
	resources: string[]
	description: string
}): string => {
	let object = `Type.Object({${resources}}, {description: '${description}'})`

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
