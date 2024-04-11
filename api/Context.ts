const baseURL = `https://github.com/hello-nrfcloud/proto-map`

export const Context = {
	device: new URL(`${baseURL}/device`),
	devices: new URL(`${baseURL}/devices`),
	shareDevice: {
		request: new URL(`${baseURL}/share-device-request`),
		ownershipConfirmed: new URL(`${baseURL}/share-device-ownership-confirmed`),
	},
}
