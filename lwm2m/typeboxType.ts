/**
 * Creating the typebox type definition with Typescript compiler API
 */
import { addDocBlock } from 'generator/addDocBlock.js'
import ts from 'typescript'


export const generateLwm2mTimestampResources = (
	timestampResources: Record<number, number>,
): ts.Node[] => {
	const type = ts.factory.createVariableStatement(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(`timestampResources`),
					undefined,
					ts.factory.createTypeReferenceNode('Readonly', [
						ts.factory.createTypeReferenceNode('Record', [
							ts.factory.createTypeReferenceNode('number'),
							ts.factory.createTypeReferenceNode('number'),
						]),
					]),
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
	addDocBlock(
		[
			'Contains the ID of the resource that defines the timestamp for each LwM2M object definition',
		],
		type,
	)

	return [type]
}
