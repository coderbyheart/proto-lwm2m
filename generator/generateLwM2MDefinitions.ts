import ts, { type ObjectLiteralElementLike } from 'typescript'
import { addDocBlock } from './addDocBlock.js'
import type { ParsedLwM2MObjectDefinition } from '../lwm2m/ParsedLwM2MObjectDefinition.js'
import { generateName } from './generateType.js'

export const generateLwM2MDefinitions = (
	definitions: ParsedLwM2MObjectDefinition[],
): ts.Node[] => {
	const importLWM2MObjectInfo = ts.factory.createImportDeclaration(
		undefined,
		ts.factory.createImportClause(
			false,
			undefined,
			ts.factory.createNamedImports([
				ts.factory.createImportSpecifier(
					true,
					undefined,
					ts.factory.createIdentifier(`LWM2MObjectInfo`),
				),
				ts.factory.createImportSpecifier(
					false,
					undefined,
					ts.factory.createIdentifier(`ResourceType`),
				),
			]),
		),
		ts.factory.createStringLiteral('./LWM2MObjectInfo.js'),
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

	const type = ts.factory.createVariableStatement(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(`definitions`),
					undefined,
					ts.factory.createTypeReferenceNode('Readonly', [
						ts.factory.createTypeReferenceNode('Record', [
							ts.factory.createTypeReferenceNode('LwM2MObjectID'),
							ts.factory.createTypeReferenceNode('LWM2MObjectInfo'),
						]),
					]),
					ts.factory.createObjectLiteralExpression(
						definitions.map((definition) => {
							const objectDef = ts.factory.createPropertyAssignment(
								ts.factory.createComputedPropertyName(
									ts.factory.createPropertyAccessExpression(
										ts.factory.createIdentifier('LwM2MObjectID'),
										generateName(definition),
									),
								),
								ts.factory.createObjectLiteralExpression([
									ts.factory.createPropertyAssignment(
										'ObjectID',
										ts.factory.createPropertyAccessExpression(
											ts.factory.createIdentifier('LwM2MObjectID'),
											generateName(definition),
										),
									),
									ts.factory.createPropertyAssignment(
										'ObjectVersion',
										ts.factory.createStringLiteral(
											definition.ObjectVersion ?? '1.0',
										),
									),
									ts.factory.createPropertyAssignment(
										'Name',
										ts.factory.createStringLiteral(definition.Name),
									),
									ts.factory.createPropertyAssignment(
										'Description',
										ts.factory.createStringLiteral(definition.Description1),
									),
									ts.factory.createPropertyAssignment(
										'Resources',
										ts.factory.createObjectLiteralExpression(
											definition.Resources.Item.map((Resource) => {
												const props: ObjectLiteralElementLike[] = [
													ts.factory.createPropertyAssignment(
														'ResourceID',
														ts.factory.createNumericLiteral(Resource.$.ID),
													),
													ts.factory.createPropertyAssignment(
														'Name',
														ts.factory.createStringLiteral(Resource.Name),
													),
													ts.factory.createPropertyAssignment(
														'Mandatory',
														ts.factory.createIdentifier(
															Resource.Mandatory === 'Mandatory'
																? 'true'
																: 'false',
														),
													),
													ts.factory.createPropertyAssignment(
														'Type',
														ts.factory.createPropertyAccessExpression(
															ts.factory.createIdentifier('ResourceType'),
															Resource.Type,
														),
													),
													ts.factory.createPropertyAssignment(
														'Description',
														ts.factory.createStringLiteral(
															Resource.Description,
														),
													),
												]

												if (Resource.RangeEnumeration.length > 0)
													props.push(
														ts.factory.createPropertyAssignment(
															'RangeEnumeration',
															ts.factory.createStringLiteral(
																Resource.RangeEnumeration,
															),
														),
													)

												if (Resource.Units.length > 0)
													props.push(
														ts.factory.createPropertyAssignment(
															'Units',
															ts.factory.createStringLiteral(Resource.Units),
														),
													)

												const resourceDef = ts.factory.createPropertyAssignment(
													ts.factory.createNumericLiteral(Resource.$.ID),
													ts.factory.createObjectLiteralExpression(props),
												)

												addDocBlock(
													[
														`${Resource.Name} (${Resource.Type})`,
														``,
														Resource.Description,
													],
													resourceDef,
												)

												return resourceDef
											}),
										),
									),
								]),
							)

							addDocBlock(
								[
									`${definition.Name} (${definition.ObjectID})`,
									``,
									definition.Description1,
								],
								objectDef,
							)

							return objectDef
						}),
					),
				),
			],
			ts.NodeFlags.Const,
		),
	)
	addDocBlock(
		[
			'Contains the ID of the resource that defines the timestamp for each LwM2M object definition',
		],
		type,
	)

	return [importLWM2MObjectInfo, importLwM2MObjectID, type]
}
