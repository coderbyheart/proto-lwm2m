// @see https://github.com/sinclairzx81/typebox?tab=readme-ov-file#typecheck-typecompiler
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { Type } from '@sinclair/typebox'

const validate = TypeCompiler.Compile(
	Type.Object({
		x: Type.Date(),
	}),
)

const first = validate.Errors({ x: new Date() }).First()
console.log(first)

console.log(
	TypeCompiler.Code(
		Type.Object({
			x: Type.Optional(Type.Date()),
		}),
		{
			language: 'typescript',
		},
	),
)
