export const tokenizeName = (name: string): string =>
	name
		.split(' ')
		.map((s) => `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`)
		.join(' ')
		.replaceAll(' ', '')
		.replaceAll('&', 'and')
		.replace(/^(\d)(.+)/, 'n$1$2')
		.replaceAll(/[^a-z0-9]/gi, '_')
		.replaceAll(/_{2,}/g, '_')
		.replaceAll(/_+$/g, '')
		.trim()
