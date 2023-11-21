import chalk from 'chalk'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { unwrapNestedArray } from '../lwm2m/unwrapNestedArray.js'
import xml2js from 'xml2js'
import type { ParsedLwM2MObjectDefinition } from '../lwm2m/ParsedLwM2MObjectDefinition.js'
import ts from 'typescript'

import { printNode } from './printNode.js'
import os from 'node:os'
import { generateTypeBox } from './generateTypeBox.js'
import { addDocBlock } from './addDocBlock.js'
import { generateName } from './generateTypeBox.js'

const baseDir = process.cwd()
const subDir = (...tree: string[]): string => path.join(baseDir, ...tree)

const idMembers: ts.EnumMember[] = []

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

	const member = ts.factory.createEnumMember(
		generateName(definition),
		ts.factory.createNumericLiteral(ObjectID),
	)
	addDocBlock(
		[`${definition.Name} (${ObjectID})`, ``, definition.Description1],
		member,
	)
	idMembers.push(member)

	const file = subDir('lwm2m', `${ObjectID}_typebox.ts`)
	console.log(chalk.green('Writing'), chalk.blue(file.replace(baseDir, '')))
	await writeFile(
		file,
		generateTypeBox(definition).map(printNode).join(os.EOL),

		'utf-8',
	)
}

const idFile = subDir('lwm2m', `LwM2MObjectID.ts`)
console.log(chalk.green('Writing'), chalk.blue(idFile.replace(baseDir, '')))
const enumNode = ts.factory.createEnumDeclaration(
	[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
	ts.factory.createIdentifier('LwM2MObjectID'),
	idMembers,
)
addDocBlock(['The LwM2M Object IDs defined in this repo.'], enumNode)

await writeFile(idFile, [enumNode].map(printNode).join(os.EOL), 'utf-8')
