const baseURL = `https://github.com/hello-nrfcloud/proto-map`

export const Context = {
	device: new URL(`${baseURL}/device`),
	devices: new URL(`${baseURL}/devices`),
	history: {
		resource: new URL(`${baseURL}/history/resource`),
	},
	shareDevice: {
		request: new URL(`${baseURL}/share-device-request`),
		ownershipConfirmed: new URL(`${baseURL}/share-device-ownership-confirmed`),
	},
	objectUpdate: new URL(`${baseURL}/object/update`),
	named: (name: string): URL => new URL(`${baseURL}/${name}`),
}
