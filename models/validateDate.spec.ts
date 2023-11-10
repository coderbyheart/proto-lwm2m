import { describe, it } from 'node:test'
import assert from 'node:assert'
import type { Static, TSchema } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { ErrorObject } from 'ajv'
import Ajv, { type AnySchema } from 'ajv'
import { TypeGuard } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import addFormats from 'ajv-formats'

/**
 * @see https://github.com/sinclairzx81/typebox/blob/a770b94c737d7771ca249fb645aad8e915032c60/test/runtime/compiler-ajv/validate.ts
 */
const schemaOf = (schemaOf: string, value: unknown, schema: unknown) => {
	switch (schemaOf) {
		case 'Constructor':
			return TypeGuard.TConstructor(schema) && Value.Check(schema, value)
		case 'Function':
			return TypeGuard.TFunction(schema) && Value.Check(schema, value)
		case 'Date':
			return TypeGuard.TDate(schema) && Value.Check(schema, value)
		case 'Promise':
			return TypeGuard.TPromise(schema) && Value.Check(schema, value)
		case 'Uint8Array':
			return TypeGuard.TUint8Array(schema) && Value.Check(schema, value)
		case 'Undefined':
			return TypeGuard.TUndefined(schema) && Value.Check(schema, value)
		case 'Void':
			return TypeGuard.TVoid(schema) && Value.Check(schema, value)
		default:
			return false
	}
}

/**
 * @see https://github.com/sinclairzx81/typebox/blob/a770b94c737d7771ca249fb645aad8e915032c60/test/runtime/compiler-ajv/validate.ts
 */
const createAjv = (references: AnySchema[]) => {
	return addFormats(new Ajv({}), ['date-time', 'time', 'date'])
		.addKeyword({ type: 'object', keyword: 'instanceOf', validate: schemaOf })
		.addSchema(references)
}

const checkTypeboxOk = <T extends TSchema>(
	type: T,
	data: unknown,
	additional: AnySchema[] = [],
) => {
	const ajv = createAjv(additional)
	const execute = () => {
		// required as ajv will throw if referenced schema is not found
		try {
			return ajv.validate(type, data) as boolean
		} catch {
			return false
		}
	}
	console.log('---------------------------')
	console.log('type')
	console.log('---------------------------')
	console.log(JSON.stringify(type, null, 2))
	console.log('---------------------------\n\n')
	console.log('data')
	console.log('---------------------------')
	console.log(JSON.stringify(data, null, 2), typeof data)
	console.log('---------------------------\n\n')
	if (execute() === false) {
		console.log('errors')
		console.log('---------------------------')
		console.log(ajv.errorsText(ajv.errors))
		/**
     * Error message: ajv.errors[0]
     
    data/properties/99/type must be equal to one of the allowed values, data/properties/99/type must be array, data/properties/99/type must match a schema in anyOf 
    {
      instancePath: '/properties/99/type',
      schemaPath: '#/definitions/simpleTypes/enum',
      keyword: 'enum',
      params: {
        allowedValues: [
          'array',   'boolean',
          'integer', 'null',
          'number',  'object',
          'string'
        ]
      },
      message: 'must be equal to one of the allowed values'
    }

     */
		throw Error('validation fails')
	}
}

/**
 * Typebox type definition
 */
export const test_99 = Type.Object({
	99: Type.Date({
		$id: '99',
		title: 'Timestamp',
		description:
			'The timestamp of when the location measurement was performed.',
		formart: 'date',
	}),
})

/**
 * @see node_modules/@hello.nrfcloud.com/proto/validator/validateWithTypeBox.ts
 *
 * seems like ajv compilation check is not longer supported in Typebox
 * @see https://github.com/sinclairzx81/typebox/blob/master/test/runtime/compiler-ajv/date.ts
 */
export const validateWithTypeBox = <T extends TSchema>(
	schema: T,
): ((value: unknown) =>
	| { value: Static<typeof schema> }
	| {
			errors: ErrorObject[]
	  }) => {
	const ajv = new Ajv()
	const v = ajv.compile(schema)
	return (value: unknown) => {
		const valid = v(value)
		if (valid !== true) {
			return {
				errors: v.errors as ErrorObject[],
			}
		}
		return { value: value as Static<typeof schema> }
	}
}

/**
 * When checking for date format, the following error is returned:
 *
 * "Error: schema is invalid: data/properties/Resources/properties/99/type must be equal to one of the allowed values,
 * data/properties/Resources/properties/99/type must be array, data/properties/Resources/properties/99/type must match a schema in anyOf"
 */
void describe('validateDate', () => {
	void it(`should check date format`, async () => {
		const object: Static<typeof test_99> = {
			99: new Date(1698155694),
		}

		assert.deepEqual(new Date(1698155694), object[99])

		/*
    const T1 = Type.String()
    checkTypeboxOk(T1, '1')
    */

		checkTypeboxOk(test_99, object)

		const T = Type.Date()
		checkTypeboxOk(T, new Date())

		/*
		const result = validateWithTypeBox(test_99)(object) as unknown as {
			value: unknown
		}

		assert.deepEqual(result.value, object)
    */
	})
})
