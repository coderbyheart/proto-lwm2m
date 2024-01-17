import { SenML } from '../senml/SenMLSchema.js'
import { validate } from '../validate.js'

const validator = validate(SenML)

export const validateSenML = (
	maybeSenML: unknown,
): ReturnType<typeof validator> => validator(maybeSenML)
