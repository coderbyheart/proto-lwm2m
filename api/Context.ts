const baseURL = `https://github.com/hello-nrfcloud/proto-map`

export const Context = {
	device: new URL(`${baseURL}/device`),
	deviceCredentials: new URL(`${baseURL}/device/credentials`),
	devices: new URL(`${baseURL}/devices`),
	deviceJWT: new URL(`${baseURL}/device-jwt`),
	userJWT: new URL(`${baseURL}/user-jwt`),
	shareDevice: {
		request: new URL(`${baseURL}/share-device-request`),
		ownershipConfirmed: new URL(`${baseURL}/share-device-ownership-confirmed`),
	},
	apiHealth: new URL(`${baseURL}/api/health`),
}
