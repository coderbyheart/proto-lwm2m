/**
 * Create typebox defintion for object
 */
export const createObjectDefinition = ({
	multiple,
	mandatory,
	resources,
}: {
	multiple: string
	mandatory: string
	resources: string[]
}): string => {
	let object = `Type.Object({${resources}})`

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
