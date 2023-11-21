import ts from 'typescript'
import { addDocBlock } from './addDocBlock.js'
import type {
	ParsedLwM2MObjectDefinition,
	Resource,
} from '../lwm2m/ParsedLwM2MObjectDefinition.js'
import { LwM2MType, resourceType } from '../lwm2m/resourceType.js'
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
				ts.factory.createImportSpecifier(
					true,
					undefined,
					ts.factory.createIdentifier(`Static`),
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
		ts.factory.createStringLiteral('./objects.js'),
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
		ts.factory.createStringLiteral('./LwM2MObjectID.js'),
	)

	const resourceTypeBoxDefiniton = (resource: Resource) =>
		ts.factory.createCallExpression(
			ts.factory.createPropertyAccessExpression(
				ts.factory.createIdentifier('Type'),
				ts.factory.createIdentifier(
					`${resourceType(resource.Type as LwM2MType)}`,
				),
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

	/**
	 * TypeBox definition for all the resources
	 */
	const resourcesDef = Resources.Item.map((resource) => {
		return ts.factory.createPropertyAssignment(
			ts.factory.createIdentifier(`${resource.$.ID}`),
			resource.Mandatory === 'Mandatory'
				? resourceTypeBoxDefiniton(resource)
				: // optional
				  ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createIdentifier('Type'),
							ts.factory.createIdentifier('Optional'),
						),
						undefined,
						[resourceTypeBoxDefiniton(resource)],
				  ),
		)
	})

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
						[ts.factory.createObjectLiteralExpression(resourcesDef)],
					),
				),
			]),
			ts.factory.createObjectLiteralExpression([
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
					ts.factory.createIdentifier(name),
					undefined,
					undefined,
					typeBoxObject,
				),
			],
			ts.NodeFlags.Const,
		),
	)
	addDocBlock([`${Name} (${ObjectID})`, '', Description1], exportTypeBoxDef)

	const exportTypeBoxType = ts.factory.createTypeAliasDeclaration(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createIdentifier(`${tokenizeName(Name)}_${ObjectID}_Type`),
		undefined,
		ts.factory.createTypeReferenceNode('LwM2MObject', [
			ts.factory.createTypeReferenceNode('Static', [
				ts.factory.createTypeQueryNode(ts.factory.createIdentifier(name)),
			]),
		]),
	)

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
