import { Type, type TString } from '@sinclair/typebox'

export const IsoDateType = (description?: string): TString =>
	Type.String({
		pattern:
			'^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2}(?:.[0-9]*)?)(([+-]([0-9]{2}):([0-9]{2})|Z)?)$',
		description: description ?? 'A date formatted as an ISO 8601 string',
		examples: [new Date().toISOString()],
	})
