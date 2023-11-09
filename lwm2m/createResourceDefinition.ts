export enum LwM2MType {
	Boolean = 'Boolean',
	Float = 'Float',
	Integer = 'Integer',
	UnsignedInteger = 'Unsigned Integer',
	Objlnk = 'Objlnk',
	Corelnk = 'Corelnk',
	Opaque = 'Opaque',
	String = 'String',
	Time = 'Time',
}
/**
 * Transform from LwM2M type to Typebox type
 */
const resourceType = (type: LwM2MType) => {
	let typeSpecification = ''
	switch (type) {
		case LwM2MType.Float:
			typeSpecification = 'Number'
			break
		case LwM2MType.Integer:
		case LwM2MType.UnsignedInteger:
			typeSpecification = 'Integer'
			break
		case LwM2MType.Boolean:
			typeSpecification = 'Boolean'
			break
		case LwM2MType.String:
		case LwM2MType.Opaque:
		case LwM2MType.Corelnk:
		case LwM2MType.Objlnk:
			typeSpecification = 'String'
			break
		case LwM2MType.Time:
			typeSpecification = 'Date'
			break
	}
	return typeSpecification
}

/**
 * Create typebox defintion for resource
 */
export const createResourceDefinition = ({
	name,
	multiple,
	mandatory,
	description,
	type,
}: {
	name: string
	multiple: string
	mandatory: string
	description: string
	type: LwM2MType
}): string => {
	let typeDefinition = `Type.${resourceType(
		type,
	)}({description: '${description}',})`

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
