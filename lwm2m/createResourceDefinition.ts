/**
 * Create typebox defintion for resource
 */
export const createResourceDefinition = ({
	name,
	multiple,
	mandatory,
	description,
}: {
	name: string
	multiple: string
	mandatory: string
	description: string
}): string => {
	let typeDefinition = `Type.Object({},{description: '${description}',})`

	if (multiple === 'Multiple')
		typeDefinition = `Type.Array(
        ${typeDefinition}
    )`

	if (mandatory === 'Optional')
		typeDefinition = `Type.Optional(
        ${typeDefinition}
    )`

	return `${name} : ${typeDefinition}`
}
