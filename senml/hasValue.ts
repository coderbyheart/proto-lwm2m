export const hasValue = (m: unknown): boolean => {
	if (m === null) return false
	if (typeof m !== 'object') return false
	const v =
		('bv' in m ? m.bv : undefined) ??
		('v' in m ? m.v : undefined) ??
		('vs' in m ? m.vs : undefined) ??
		('vb' in m ? m.vb : undefined) ??
		('vd' in m ? m.vd : undefined)
	if (v === null || v === undefined) return false
	return true
}
