import ts from 'typescript'
import { addDocBlock } from './addDocBlock.js'

export const generateModels = (
	models: {
		id: string
		transforms: {
			type: 'shadow' | 'messages'
			match: string
			transform: string
		}[]
	}[],
): ts.Node[] => {
	const types: ts.Node[] = []

	types.push(
		ts.factory.createImportDeclaration(
			undefined,
			ts.factory.createImportClause(
				false,
				undefined,
				ts.factory.createNamedImports([
					ts.factory.createImportSpecifier(
						true,
						undefined,
						ts.factory.createIdentifier('Transformer'),
					),
					ts.factory.createImportSpecifier(
						false,
						undefined,
						ts.factory.createIdentifier('TransformerType'),
					),
				]),
			),
			ts.factory.createStringLiteral(`./types.js`),
		),
	)

	const type = ts.factory.createVariableStatement(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createVariableDeclarationList(
			[
				ts.factory.createVariableDeclaration(
					ts.factory.createIdentifier(`models`),
					undefined,
					ts.factory.createTypeReferenceNode('Readonly', [
						ts.factory.createTypeLiteralNode(
							models.map((model) =>
								ts.factory.createPropertySignature(
									undefined,
									ts.factory.createStringLiteral(model.id),
									undefined,
									ts.factory.createTypeLiteralNode([
										ts.factory.createPropertySignature(
											undefined,
											ts.factory.createStringLiteral('id'),
											undefined,
											ts.factory.createLiteralTypeNode(
												ts.factory.createStringLiteral(model.id),
											),
										),
										ts.factory.createPropertySignature(
											undefined,
											ts.factory.createStringLiteral('transforms'),
											undefined,
											ts.factory.createTypeReferenceNode('Readonly', [
												ts.factory.createTypeReferenceNode('Array', [
													ts.factory.createTypeReferenceNode('Transformer'),
												]),
											]),
										),
									]),
								),
							),
						),
					]),
					ts.factory.createAsExpression(
						ts.factory.createObjectLiteralExpression(
							models.map((model) =>
								ts.factory.createPropertyAssignment(
									ts.factory.createStringLiteral(model.id),
									// The model object
									ts.factory.createObjectLiteralExpression([
										// id
										ts.factory.createPropertyAssignment(
											ts.factory.createStringLiteral('id'),
											ts.factory.createStringLiteral(model.id),
										),
										// transforms
										ts.factory.createPropertyAssignment(
											ts.factory.createStringLiteral('transforms'),
											ts.factory.createArrayLiteralExpression(
												model.transforms.map((transform) =>
													ts.factory.createObjectLiteralExpression([
														// type
														ts.factory.createPropertyAssignment(
															ts.factory.createStringLiteral('type'),
															transform.type === 'messages'
																? ts.factory.createIdentifier(
																		'TransformerType.Messages',
																	)
																: ts.factory.createIdentifier(
																		'TransformerType.Shadow',
																	),
														),
														// match
														ts.factory.createPropertyAssignment(
															ts.factory.createStringLiteral('match'),
															createAssignment(transform.match),
														),
														// transform
														ts.factory.createPropertyAssignment(
															ts.factory.createStringLiteral('transform'),
															createAssignment(transform.transform),
														),
													]),
												),
											),
										),
									]),
								),
							),
						),
						ts.factory.createTypeReferenceNode('const'),
					),
				),
			],
			ts.NodeFlags.Const,
		),
	)
	addDocBlock(['The models defined for hello.nrfcloud.com'], type)
	types.push(type)

	return types
}

const createAssignment = (v: unknown): ts.Expression => {
	if (v === null) return ts.factory.createNull()
	if (typeof v === 'string') {
		return ts.factory.createStringLiteral(v)
	}
	if (Array.isArray(v)) {
		return ts.factory.createArrayLiteralExpression(
			v.map((el) => createAssignment(el)),
		)
	}
	if (typeof v === 'object')
		return ts.factory.createObjectLiteralExpression(
			Object.entries(v).map(([k, v]) =>
				ts.factory.createPropertyAssignment(
					ts.factory.createStringLiteral(k),
					createAssignment(v),
				),
			),
		)
	const nullNode = ts.factory.createNull()
	addDocBlock([`Could not convert node`, JSON.stringify(v)], nullNode)
	return nullNode
}
