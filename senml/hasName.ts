export const hasName = (m: unknown): m is { n: string } => {
	if (m === null) return false
	if (typeof m !== 'object') return false
	return 'n' in m
}
