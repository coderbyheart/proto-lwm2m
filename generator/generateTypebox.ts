import ts from 'typescript'
import { addDocBlock } from './addDocBlock.js'
import { typeName } from './typebox.js'

/**
 * uses src/type-generation/createLwM2MObjectType.ts from lwm2m-types-js as a ref
 */

export const generateTypebox = ({
	timestampResources,
	name,
	id,
	description,
	objectVersion
}: {
	timestampResources: Record<number, number>
	name: string
	id: number
	description: string
	objectVersion: string
}): ts.Node[] => {
	/**
	 * import { Type } from '@sinclair/typebox'
	 */
	const importTypebox = ts.factory.createImportDeclaration(
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

	/**
	 * Type.Object({ObjectVersion: ..., ObjectID: ..., Resources:...}, {description: ...});
	 */
	const typeboxObject = ts.factory.createCallExpression(
		ts.factory.createPropertyAccessExpression(
			ts.factory.createIdentifier('Type'),
			ts.factory.createIdentifier('Object'),
		),
		undefined,
		[
			ts.factory.createObjectLiteralExpression([

				// Object Version
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('ObjectVersion'),
					ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createIdentifier('Type'),
							ts.factory.createIdentifier('String'),
						),
						undefined,
						[
							ts.factory.createObjectLiteralExpression(
								[
									ts.factory.createPropertyAssignment(
										ts.factory.createIdentifier('examples'),
										ts.factory.createArrayLiteralExpression([
											ts.factory.createStringLiteral(`${objectVersion}`),
										]),
									),
								],
								undefined,
							),
						],
					),
				),

				// Object ID
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('ObjectID'),
					ts.factory.createCallExpression(
						ts.factory.createPropertyAccessExpression(
							ts.factory.createIdentifier('Type'),
							ts.factory.createIdentifier('Number'),
						),
						undefined,
						[
							ts.factory.createObjectLiteralExpression(
								[
									ts.factory.createPropertyAssignment(
										ts.factory.createIdentifier('examples'),
										ts.factory.createArrayLiteralExpression([
											ts.factory.createNumericLiteral(id),
										]),
									),
								],
								undefined,
							),
						],
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
							// Resources here
						],
					),
				),
			]),
			ts.factory.createObjectLiteralExpression([
				ts.factory.createPropertyAssignment(
					ts.factory.createIdentifier('description'),
					ts.factory.createStringLiteral(description),
				),
			]),
		],
	)

	/**
	 * export const XXXX =
	 */
	const variableDeclaration = ts.factory.createVariableStatement(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(`${typeName(`${id}`, name)}`),
					undefined,
					undefined,
					typeboxObject,
				),
			],
			ts.NodeFlags.Const,
		),
	)
	addDocBlock([`${name}: ${description}`], variableDeclaration)

	return [importTypebox, variableDeclaration]
}
