import { Type } from '@sinclair/typebox'

export const ModelIDRegExp = /^[A-Za-z0-9+]+$/

export enum TransformerType {
	ShadowReported = 'reported',
	ShadowDesired = 'desired',
	Messages = 'messages',
}
type Transformer = {
	type: TransformerType
	match: string
	transform: string
}
export type Models = Readonly<
	Record<
		string,
		{
			id: string
			transforms: Transformer[]
		}
	>
>

export const FrontMatter = Type.Object({
	type: Type.Union([
		Type.Literal('reported'),
		Type.Literal('desired'),
		Type.Literal('messages'),
	]),
})
