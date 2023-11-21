import chalk from 'chalk'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { unwrapNestedArray } from '../lwm2m/unwrapNestedArray.js'
import xml2js from 'xml2js'
import type { ParsedLwM2MObjectDefinition } from '../lwm2m/ParsedLwM2MObjectDefinition.js'
import prettier from 'prettier'

import { printNode } from './printNode.js'
import os from 'node:os'
import { generateTypeBox } from './generateTypeBox.js'

const baseDir = process.cwd()
const subDir = (...tree: string[]): string => path.join(baseDir, ...tree)

console.log(chalk.gray('Creating TypeBox definition for LwM2M objects'))
for (const objectDefinitionFile of (await readdir(subDir('lwm2m'))).filter(
	(s) => s.endsWith('.xml'),
)) {
	const definition = (
		unwrapNestedArray(
			await xml2js.parseStringPromise(
				await readFile(subDir('lwm2m', objectDefinitionFile), 'utf-8'),
			),
		) as any
	).LWM2M.Object as ParsedLwM2MObjectDefinition
	const ObjectID = parseInt(definition.ObjectID, 10)

	const file = subDir('lwm2m', `${ObjectID}_typebox.ts`)
	console.log(chalk.green('Writing'), chalk.blue(file.replace(baseDir, '')))
	await writeFile(
		file,
		await prettier.format(
			generateTypeBox(definition).map(printNode).join(os.EOL),
			{
				parser: 'typescript',
			},
		),
		'utf-8',
	)
}
