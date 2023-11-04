import { validateWithTypeBox } from '@hello.nrfcloud.com/proto'
import { SenML } from '../senml/SenMLSchema.js'

const validator = validateWithTypeBox(SenML)

export const validateSenML = (
	maybeSenML: unknown,
): ReturnType<typeof validator> => validator(maybeSenML)
