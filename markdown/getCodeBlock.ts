import type { RootContent, Heading, Paragraph } from 'mdast'
import { remark } from 'remark'

export const parseMarkdown2 = remark()

const isCodeBlock =
	(lang: string) =>
	(child: RootContent): boolean =>
		child.type === 'code' && child.lang === lang

const isHeadingWithTitle =
	(title: string) =>
	(child: RootContent): boolean =>
		child.type === 'heading' &&
		child.children[0]?.type === 'text' &&
		child.children[0].value === title
const isHeading = (child: RootContent): child is Heading =>
	child.type === 'heading'
const isParagraph = (child: RootContent): child is Paragraph =>
	child.type === 'paragraph'

const codeBlockWithHeading =
	(children: RootContent[]) =>
	(lang: string, title: string): string => {
		const block = children.find((child, index, array) => {
			if (!isCodeBlock(lang)(child)) return false
			const prevChild = array[index - 1]
			if (prevChild === undefined) return false
			return isHeadingWithTitle(title)(prevChild)
		}) as { value: string } | undefined
		if (block === undefined)
			throw new Error(`Could not find ${lang} codeblock with title "${title}"!`)
		return block.value
	}

const headingWithLevel = (
	children: RootContent[],
	level: number,
): Heading | undefined =>
	children.filter(isHeading).find(({ depth }) => depth === level)

export const getCodeBlock = (
	markdown: string,
): ((lang: string, title: string) => string) =>
	codeBlockWithHeading(remark().parse(markdown).children)

export const getHeading = (
	markdown: string,
	level: number,
): Heading | undefined =>
	headingWithLevel(remark().parse(markdown).children, level)

// Find all the paragraphs immediately after the first headline with the given level
export const getParagraphsAfterHeading = (
	markdown: string,
	level: number,
): Paragraph[] => {
	let headingFound = false
	const paragraphs: Paragraph[] = []
	for (const child of remark().parse(markdown).children) {
		if (!headingFound && isHeading(child) && child.depth === level) {
			headingFound = true
			continue
		}
		if (!isParagraph(child)) break // once we reached a non-paragraph
		paragraphs.push(child)
	}
	return paragraphs
}
