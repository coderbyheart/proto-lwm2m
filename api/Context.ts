const baseURL = `https://github.com/hello-nrfcloud/proto-map`

export const Context = {
	device: new URL(`${baseURL}/device`),
	devices: new URL(`${baseURL}/devices`),
	deviceJWT: new URL(`${baseURL}/device-jwt`),
	shareDevice: {
		request: new URL(`${baseURL}/share-device-request`),
		ownershipConfirmed: new URL(`${baseURL}/share-device-ownership-confirmed`),
	},
	named: (name: string): URL => new URL(`${baseURL}/${name}`),
	apiHealth: new URL(`${baseURL}/api/health`),
}
