const labelMap = new Map<number, string>([
	[-1, 'bver'], // Base Version
	[-2, 'bn'], // Base Name
	[-3, 'bt'], // Base Time
	[-4, 'bu'], // Base Unit
	[-5, 'bv'], // Base Value
	[-6, 'bs'], // Base Sum
	[0, 'n'], // Name
	[1, 'u'], // Unit
	[2, 'v'], // Value
	[3, 'vs'], // String Value
	[4, 'vb'], // Boolean Value
	[5, 's'], // Sum
	[6, 't'], // Time
	[7, 'ut'], // Update Time
	[8, 'vd'], // Data Value
])
/**
 * Convert SenML from CBOR notation to JSON notation.
 *
 * @see https://www.rfc-editor.org/rfc/rfc8428.html#section-6
 */
export const fromCBOR = (
	records: Array<Record<number, any>>,
): Array<Record<string, unknown>> =>
	records.map((record) =>
		Object.entries(record).reduce((json, [k, v]) => {
			const label = labelMap.get(parseInt(k, 10))
			if (label === undefined) return json
			if (typeof v === 'bigint') v = Number(v)
			return {
				...json,
				[label]: v,
			}
		}, {}),
	)
