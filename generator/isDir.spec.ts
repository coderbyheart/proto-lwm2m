import { isDir } from './isDir.js'
import { describe, it, before } from 'node:test'
import assert from 'node:assert/strict'
import os from 'node:os'
import { mkdtemp } from 'node:fs/promises'
import path from 'node:path'

void describe('isDir()', () => {
	let dir: string
	void before(async () => {
		dir = await mkdtemp(path.join(os.tmpdir(), 'isdir-'))
	})
	void it('should return true if the path is a directory', async () =>
		assert.strictEqual(await isDir(dir), true))

	void it('should return false if the path is not a directory', async () =>
		assert.strictEqual(await isDir(path.join(dir, 'foo.txt')), false))

	void it('should return false if an error occurs', async () =>
		assert.strictEqual(await isDir(path.join(dir, 'foo')), false))
})
