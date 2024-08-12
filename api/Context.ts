const baseURL = `https://github.com/hello-nrfcloud/proto-map`

export const Context = {
	device: new URL(`${baseURL}/device`),
	deviceCredentials: new URL(`${baseURL}/device/credentials`),
	devices: new URL(`${baseURL}/devices`),
	userDevices: new URL(`${baseURL}/user-devices`),
	deviceJWT: new URL(`${baseURL}/device-jwt`),
	userJWT: new URL(`${baseURL}/user-jwt`),
	apiHealth: new URL(`${baseURL}/api/health`),
}
