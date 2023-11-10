import { TypeCompiler, type ValueError } from '@sinclair/typebox/compiler'
import type { TSchema, Static } from '@sinclair/typebox'

export const validateWithTypeBox = <T extends TSchema>(
	schema: T,
): ((value: unknown) =>
	| { value: Static<typeof schema> }
	| {
			error: ValueError
	  }) => {
	const validate = TypeCompiler.Compile(schema)
	return (value: unknown) => {
		const valid = validate.Errors(value).First() === undefined
		if (valid === false) {
			return {
				error: validate.Errors(value).First() as ValueError,
			}
		}
		return { value: value as Static<typeof schema> }
	}
}
