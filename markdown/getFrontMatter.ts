import type { Static, TObject } from '@sinclair/typebox'
import { remark } from 'remark'
import frontmatter from 'remark-frontmatter'
import { validate } from '../validate.js'
import yaml from 'yaml'

export const getFrontMatter = <Schema extends TObject>(
	markdown: string,
	schema: Schema,
): Static<Schema> => {
	const data = yaml.parse(
		(
			remark().use(frontmatter, ['yaml']).parse(markdown).children[0] as {
				value: string
			}
		).value,
	)
	const maybeValid = validate(schema)(data)
	if ('errors' in maybeValid) {
		console.error(maybeValid.errors)
		throw new Error(`Frontmatter is not valid!`)
	}
	return maybeValid.value
}
