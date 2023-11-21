import ts from 'typescript'
import { addDocBlock } from './addDocBlock.js'
import type {
	ParsedLwM2MObjectDefinition,
	Resource,
} from '../lwm2m/ParsedLwM2MObjectDefinition.js'
import { LwM2MType } from '../lwm2m/resourceType.js'
import { tokenizeName } from './tokenizeName.js'

export const generateTypeBox = ({
	ObjectID,
	ObjectVersion,
	Name,
	Description1,
	Resources,
}: ParsedLwM2MObjectDefinition): ts.Node[] => {
	const name = generateName({ Name, ObjectID })
	/**
	 * import { Type } from '@sinclair/typebox'
	 */
	const importTypeBox = ts.factory.createImportDeclaration(
		undefined,
		ts.factory.createImportClause(
			false,
			undefined,
			ts.factory.createNamedImports([
				ts.factory.createImportSpecifier(
					false,
					undefined,
					ts.factory.createIdentifier(`Type`),
				),
			]),
		),
		ts.factory.createStringLiteral('@sinclair/typebox'),
	)
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

	/**
	 * Type.Object({ObjectVersion: ..., ObjectID: ..., Resources:...}, {description: ...});
	 */
	const typeBoxObject = ts.factory.createCallExpression(
		ts.factory.createPropertyAccessExpression(
			ts.factory.createIdentifier('Type'),
			ts.factory.createIdentifier('Object'),
		),
		undefined,
		[
			ts.factory.createObjectLiteralExpression([
				// Object ID
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('ObjectID'),
					ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createIdentifier('Type'),
							ts.factory.createIdentifier('Literal'),
						),
						undefined,
						[
							ts.factory.createPropertyAccessExpression(
								ts.factory.createIdentifier('LwM2MObjectID'),
								ts.factory.createIdentifier(name),
							),
						],
					),
				),

				// Object Version
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('ObjectVersion'),
					ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createIdentifier('Type'),
							ts.factory.createIdentifier('Literal'),
						),
						undefined,
						[ts.factory.createStringLiteral(`${ObjectVersion ?? '1.0'}`)],
					),
				),

				// Resources
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('Resources'),
					ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createIdentifier('Type'),
							ts.factory.createIdentifier('Object'),
						),
						undefined,
						[
							ts.factory.createObjectLiteralExpression(
								byImportance(Resources.Item).map((resource) =>
									ts.factory.createPropertyAssignment(
										ts.factory.createIdentifier(`${resource.$.ID}`),
										resourceTypeBoxDefinition(resource),
									),
								),
							),
						],
					),
				),
			]),
			ts.factory.createObjectLiteralExpression([
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('title'),
					ts.factory.createStringLiteral(`${Name} (${ObjectID})`),
				),
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('description'),
					ts.factory.createStringLiteral(Description1),
				),
			]),
		],
	)

	/**
	 * export const XXXX =
	 */
	const exportTypeBoxDef = ts.factory.createVariableStatement(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(`${name}_Schema`),
					undefined,
					undefined,
					typeBoxObject,
				),
			],
			ts.NodeFlags.Const,
		),
	)
	addDocBlock([`${Name} (${ObjectID})`, '', Description1], exportTypeBoxDef)

	// We can't use typebox's Static<typeof ...> because the resulting type has no docstrings
	const exportTypeBoxType = ts.factory.createTypeAliasDeclaration(
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
							return res
						}),
					),
				),
			]),
		]),
	)
	addDocBlock([`${Name} (${ObjectID})`, '', Description1], exportTypeBoxType)

	return [
		importTypeBox,
		importLwM2MObject,
		importLwM2MObjectID,
		exportTypeBoxDef,
		exportTypeBoxType,
	]
}
export const generateName = ({
	Name,
	ObjectID,
}: Pick<ParsedLwM2MObjectDefinition, 'Name' | 'ObjectID'>): string =>
	`${tokenizeName(Name)}_${ObjectID}`

const typeBoxResourceType = (type: string): string => {
	switch (type) {
		case LwM2MType.Float:
			return 'Number'
		case LwM2MType.Integer:
		case LwM2MType.UnsignedInteger:
			return 'Integer'
		case LwM2MType.Boolean:
			return 'Boolean'
		case LwM2MType.String:
		case LwM2MType.Opaque:
		case LwM2MType.Corelnk:
		case LwM2MType.Objlnk:
			return 'String'
		case LwM2MType.Time:
			return 'Date'
		default:
			throw new Error(`Unexpected resource type: ${type}`)
	}
}

const resourceTypeBoxDefinition = (resource: Resource) => {
	const resourceDef = ts.factory.createCallExpression(
		ts.factory.createPropertyAccessExpression(
			ts.factory.createIdentifier('Type'),
			ts.factory.createIdentifier(`${typeBoxResourceType(resource.Type)}`),
		),
		undefined,
		[
			ts.factory.createObjectLiteralExpression(
				[
					ts.factory.createPropertyAssignment(
						ts.factory.createIdentifier('title'),
						ts.factory.createStringLiteral(
							`${resource.Name}${
								resource.Units.length > 0 ? ` (${resource.Units})` : ''
							}`,
						),
					),
					ts.factory.createPropertyAssignment(
						ts.factory.createIdentifier('description'),
						ts.factory.createStringLiteral(`${resource.Description}`),
					),
				],
				undefined,
			),
		],
	)

	return resource.Mandatory === 'Mandatory'
		? resourceDef
		: ts.factory.createCallExpression(
				ts.factory.createPropertyAccessExpression(
					ts.factory.createIdentifier('Type'),
					ts.factory.createIdentifier('Optional'),
				),
				undefined,
				[resourceDef],
		  )
}

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
