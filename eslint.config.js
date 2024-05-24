import config from '@bifravst/eslint-config-typescript'
export default [
	...config,
	{
		ignores: [
			'dist/**',
			'lwm2m/object/**',
			'lwm2m/validators.ts',
			'models/models.ts',
		],
	},
]
