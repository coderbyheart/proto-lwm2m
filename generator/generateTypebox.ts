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
}: {
	timestampResources: Record<number, number>
	name: string
	id: number
	description: string
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

	const typeboxDefinition = ts.factory.createVariableStatement(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(`${typeName(`${id}`, name)}`),
					undefined,
					undefined,
					ts.factory.createObjectLiteralExpression(
						Object.entries(timestampResources).map(([k, v]) =>
							ts.factory.createPropertyAssignment(
								k,
								ts.factory.createNumericLiteral(v),
							),
						),
					),
				),
			],
			ts.NodeFlags.Const,
		),
	)
	addDocBlock([`${name}: ${description}`], typeboxDefinition)

	return [importTypebox, typeboxDefinition]
}
