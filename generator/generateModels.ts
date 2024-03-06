import ts from 'typescript'
import { addDocBlock } from './addDocBlock.js'
import { tokenizeName } from './tokenizeName.js'
import { parseREADME } from 'markdown/parseREADME.js'

export const generateModels = (
	models: {
		id: string
		transforms: {
			type: 'shadow' | 'messages'
			match: string
			transform: string
		}[]
		readmeMarkdown: string
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

	types.push(
		addDocBlock(
			['The Model IDs defined in this repo.'],
			ts.factory.createEnumDeclaration(
				[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
				ts.factory.createIdentifier('ModelID'),
				models.map(({ id }) =>
					ts.factory.createEnumMember(
						tokenizeName(id),
						ts.factory.createStringLiteral(id),
					),
				),
			),
		),
	)

	types.push(
		ts.factory.createTypeAliasDeclaration(
			[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
			ts.factory.createIdentifier('Model'),
			undefined,
			ts.factory.createTypeLiteralNode([
				addDocBlock(
					['The Model ID'],
					ts.factory.createPropertySignature(
						undefined,
						ts.factory.createStringLiteral('id'),
						undefined,
						ts.factory.createTypeReferenceNode('ModelID'),
					),
				),
				addDocBlock(
					['The transformers defined for this model.'],
					ts.factory.createPropertySignature(
						undefined,
						ts.factory.createStringLiteral('transforms'),
						undefined,
						ts.factory.createTypeReferenceNode('Array', [
							ts.factory.createTypeReferenceNode('Transformer'),
						]),
					),
				),
				addDocBlock(
					['Description of the Model from the README.md'],
					ts.factory.createPropertySignature(
						undefined,
						ts.factory.createStringLiteral('about'),
						undefined,
						ts.factory.createTypeLiteralNode([
							addDocBlock(
								['The text of the H1 headline'],
								ts.factory.createPropertySignature(
									undefined,
									ts.factory.createStringLiteral('title'),
									undefined,
									ts.factory.createTypeReferenceNode('string'),
								),
							),
							addDocBlock(
								['The text of the paragraphs following the H1 headline'],
								ts.factory.createPropertySignature(
									undefined,
									ts.factory.createStringLiteral('description'),
									undefined,
									ts.factory.createTypeReferenceNode('string'),
								),
							),
						]),
					),
				),
			]),
		),
	)

	types.push(
		addDocBlock(
			['The models defined for hello.nrfcloud.com'],
			ts.factory.createVariableStatement(
				[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
				ts.factory.createVariableDeclarationList(
					[
						ts.factory.createVariableDeclaration(
							ts.factory.createIdentifier(`models`),
							undefined,
							ts.factory.createTypeReferenceNode('Readonly', [
								ts.factory.createTypeReferenceNode('Record', [
									ts.factory.createTypeReferenceNode('ModelID', []),
									ts.factory.createTypeReferenceNode('Model', []),
								]),
							]),
							ts.factory.createAsExpression(
								ts.factory.createObjectLiteralExpression(
									models.map((model) => {
										const readme = parseREADME(model.readmeMarkdown)
										return ts.factory.createPropertyAssignment(
											ts.factory.createComputedPropertyName(
												ts.factory.createPropertyAccessExpression(
													ts.factory.createIdentifier('ModelID'),
													ts.factory.createIdentifier(tokenizeName(model.id)),
												),
											),
											// The model object
											ts.factory.createObjectLiteralExpression([
												// id
												ts.factory.createPropertyAssignment(
													ts.factory.createStringLiteral('id'),
													ts.factory.createPropertyAccessExpression(
														ts.factory.createIdentifier('ModelID'),
														ts.factory.createIdentifier(tokenizeName(model.id)),
													),
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
												// About
												ts.factory.createPropertyAssignment(
													ts.factory.createStringLiteral('about'),
													ts.factory.createObjectLiteralExpression([
														ts.factory.createPropertyAssignment(
															ts.factory.createStringLiteral('title'),
															ts.factory.createStringLiteral(readme.heading),
														),
														ts.factory.createPropertyAssignment(
															ts.factory.createStringLiteral('description'),
															ts.factory.createStringLiteral(
																readme.description.join('\n'),
															),
														),
													]),
												),
											]),
										)
									}),
								),
								ts.factory.createTypeReferenceNode('const'),
							),
						),
					],
					ts.NodeFlags.Const,
				),
			),
		),
	)

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
	return addDocBlock(
		[`Could not convert node`, JSON.stringify(v)],
		ts.factory.createNull(),
	)
}
