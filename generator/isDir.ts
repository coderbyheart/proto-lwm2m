import { stat } from 'node:fs/promises'

export const isDir = async (path: string): Promise<boolean> => {
	try {
		return (await stat(path)).isDirectory()
	} catch {
		return false
	}
}
