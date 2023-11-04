export const stripEmptyValues = <T>(maybeSenML: T): T => {
	if (!Array.isArray(maybeSenML)) return maybeSenML
	// Remove measurements where the value is null
	return maybeSenML.filter((m) => {
		if (m === null) return false
		if (typeof m !== 'object') return true
		const v = m.bv ?? m.v ?? m.vs ?? m.vb ?? m.vd
		if (v === null || v === undefined) return false
		return true
	}) as T
}
