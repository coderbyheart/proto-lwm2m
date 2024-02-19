import config from '@bifravst/eslint-config-typescript'
export default [
	...config,
	{ ignores: ['dist/**', 'lwm2m/object/**', 'models/models.ts'] },
]
