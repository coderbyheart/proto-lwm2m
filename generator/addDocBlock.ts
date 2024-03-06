import ts from 'typescript'

export const addDocBlock = <T extends ts.Node>(
	comment: string[],
	node: T,
): T => {
	ts.addSyntheticLeadingComment(
		node,
		ts.SyntaxKind.MultiLineCommentTrivia,
		`*\n * ${comment.join('\n * ')} \n `,
		true,
	)
	return node
}
