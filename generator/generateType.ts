import ts from 'typescript'
import { addDocBlock } from './addDocBlock.js'
import type {
	ParsedLwM2MObjectDefinition,
	Resource,
} from '../lwm2m/ParsedLwM2MObjectDefinition.js'
import { LwM2MType } from '../lwm2m/resourceType.js'
import { tokenizeName } from './tokenizeName.js'
import { parseRangeEnumeration } from 'lwm2m/parseRangeEnumeration.js'

export const generateType = ({
	ObjectID,
	ObjectVersion,
	Name,
	Description1,
	Resources,
}: ParsedLwM2MObjectDefinition): ts.Node[] => {
	const name = generateName({ Name, ObjectID })

	const importLwM2MObject = ts.factory.createImportDeclaration(
		undefined,
		ts.factory.createImportClause(
			true,
			undefined,
			ts.factory.createNamedImports([
				ts.factory.createImportSpecifier(
					false,
					undefined,
					ts.factory.createIdentifier(`LwM2MObject`),
				),
			]),
		),
		ts.factory.createStringLiteral('../LwM2MObject.js'),
	)
	const importLwM2MObjectID = ts.factory.createImportDeclaration(
		undefined,
		ts.factory.createImportClause(
			false,
			undefined,
			ts.factory.createNamedImports([
				ts.factory.createImportSpecifier(
					false,
					undefined,
					ts.factory.createIdentifier(`LwM2MObjectID`),
				),
			]),
		),
		ts.factory.createStringLiteral('../LwM2MObjectID.js'),
	)

	// Generate the type
	const exportType = ts.factory.createTypeAliasDeclaration(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createIdentifier(name),
		undefined,
		ts.factory.createTypeReferenceNode('LwM2MObject', [
			ts.factory.createTypeLiteralNode([
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier('ObjectID'),
					undefined,
					ts.factory.createTypeReferenceNode(
						`LwM2MObjectID.${name}`,
						undefined,
					),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier('ObjectVersion'),
					undefined,
					ts.factory.createLiteralTypeNode(
						ts.factory.createStringLiteral(ObjectVersion ?? '1.0'),
					),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier('Resources'),
					undefined,
					ts.factory.createTypeLiteralNode(
						byImportance(Resources.Item).map((resource) => {
							const res = ts.factory.createPropertySignature(
								undefined,
								ts.factory.createIdentifier(`${resource.$.ID}`),
								resource.Mandatory === 'Mandatory'
									? undefined
									: ts.factory.createToken(ts.SyntaxKind.QuestionToken),
								typeScriptResourceType(resource.Type),
							)
							addDocBlock(
								[
									`${resource.Name}${
										resource.Units.length > 0 ? ` (${resource.Units})` : ''
									}`,
									``,
									resource.Description,
								],
								res,
							)
							if (resource.RangeEnumeration.length > 0) {
								const maybeRange = parseRangeEnumeration(
									resource.RangeEnumeration,
								)
								if ('error' in maybeRange) throw maybeRange.error
								addDocBlock(
									[
										`Minimum: ${maybeRange.range.min}`,
										`Maximum: ${maybeRange.range.max}`,
									],
									res,
								)
							}
							return res
						}),
					),
				),
			]),
		]),
	)
	addDocBlock([`${Name} (${ObjectID})`, '', Description1], exportType)

	return [importLwM2MObject, importLwM2MObjectID, exportType]
}
export const generateName = ({
	Name,
	ObjectID,
}: Pick<ParsedLwM2MObjectDefinition, 'Name' | 'ObjectID'>): string =>
	`${tokenizeName(Name)}_${ObjectID}`

const typeScriptResourceType = (type: string): ts.TypeNode => {
	switch (type) {
		case LwM2MType.Float:
		case LwM2MType.Integer:
		case LwM2MType.UnsignedInteger:
			return ts.factory.createTypeReferenceNode('number')
		case LwM2MType.Boolean:
			return ts.factory.createTypeReferenceNode('boolean')
		case LwM2MType.String:
		case LwM2MType.Opaque:
		case LwM2MType.Corelnk:
		case LwM2MType.Objlnk:
			return ts.factory.createTypeReferenceNode('string')
		case LwM2MType.Time:
			return ts.factory.createTypeReferenceNode('Date')
		default:
			throw new Error(`Unexpected resource type: ${type}`)
	}
}

const byImportance = (resources: Resource[]): Resource[] =>
	resources

		// sort by id
		.sort(
			({ $: { ID: id1 } }, { $: { ID: id2 } }) =>
				parseInt(id1, 10) - parseInt(id2, 10),
		)
		// sort mandatory up
		.sort(({ Mandatory: m1 }, { Mandatory: m2 }) => {
			if (m1 === 'Mandatory' && m2 === 'Mandatory') return 0
			if (m1 === 'Mandatory') return -1
			return 1
		})
