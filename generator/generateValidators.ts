import type { ParsedLwM2MObjectDefinition } from '../lwm2m/ParsedLwM2MObjectDefinition.js'
import ts from 'typescript'
import { generateName } from './generateType.js'
import { addDocBlock } from './addDocBlock.js'

export const generateValidators = (
	objects: ParsedLwM2MObjectDefinition[],
): ts.Node[] => {
	// import { LwM2MObjectID } from './LwM2MObjectID.js'
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

	const validatorImports: ts.Node[] = objects.map((object) =>
		ts.factory.createImportDeclaration(
			undefined,
			ts.factory.createImportClause(
				false,
				undefined,
				ts.factory.createNamedImports([
					ts.factory.createImportSpecifier(
						false,
						undefined,
						ts.factory.createIdentifier(`validate${object.ObjectID}`),
					),
				]),
			),
			ts.factory.createStringLiteral(`./object/validate${object.ObjectID}.js`),
		),
	)

	const validators = ts.factory.createVariableStatement(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(`validators`),
					undefined,
					undefined,
					ts.factory.createNewExpression(
						ts.factory.createIdentifier('Map'),
						[
							ts.factory.createTypeReferenceNode('LwM2MObjectID'),
							ts.factory.createFunctionTypeNode(
								undefined,
								[
									ts.factory.createParameterDeclaration(
										undefined,
										undefined,
										ts.factory.createIdentifier('o'),
										undefined,
										ts.factory.createKeywordTypeNode(
											ts.SyntaxKind.UnknownKeyword,
										),
									),
								],
								ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
							),
						],
						[],
					),
				),
			],
			ts.NodeFlags.Const,
		),
	)
	addDocBlock(
		[`Contains the validators for all registered LwM2M objects.`],
		validators,
	)

	const validatorRegistrations = objects.map((object) =>
		ts.factory.createCallExpression(
			ts.factory.createPropertyAccessExpression(
				ts.factory.createIdentifier('validators'),
				ts.factory.createIdentifier('set'),
			),
			undefined,
			[
				ts.factory.createPropertyAccessExpression(
					ts.factory.createIdentifier('LwM2MObjectID'),
					ts.factory.createIdentifier(generateName(object)),
				),
				ts.factory.createIdentifier(`validate${object.ObjectID}`),
			],
		),
	)

	return [
		importLwM2MObjectID,
		...validatorImports,
		validators,
		...validatorRegistrations,
	]
}
