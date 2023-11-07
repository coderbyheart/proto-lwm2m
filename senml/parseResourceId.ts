export type ResourceID = {
	ObjectID: number
	ObjectInstanceID: number
	ResourceID: number
	ResourceInstanceId: number
}

export const parseResourceId = (resourceId: string): ResourceID | null => {
	if (!/^\/\d+\/\d+\/\d+\/\d+$/.test(resourceId)) return null

	const [ObjectID, ObjectInstanceID, ResourceID, ResourceInstanceId] =
		resourceId
			.slice(1)
			.split('/')
			.map((s) => parseInt(s, 10)) as [number, number, number, number]

	return {
		ObjectID,
		ObjectInstanceID,
		ResourceID,
		ResourceInstanceId,
	}
}
