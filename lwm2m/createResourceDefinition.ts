import { resourceType, type LwM2MType } from "./resourceType.js"


/**
 * Create typebox defintion for resource
 */
export const createResourceDefinition = ({
	id,
	name,
	multiple,
	mandatory,
	description,
	type,
}: {
	id: string
	name: string
	multiple: string
	mandatory: string
	description: string
	type: LwM2MType
}): string => {
	let typeDefinition = `Type.${resourceType(
		type,
	)}({title: '${name}', description: '${description}',})`

	if (multiple === 'Multiple')
		typeDefinition = `Type.Array(
        ${typeDefinition}
    )`

	if (mandatory === 'Optional')
		typeDefinition = `Type.Optional(
        ${typeDefinition}
    )`

	return `${id} : ${typeDefinition}`
}
