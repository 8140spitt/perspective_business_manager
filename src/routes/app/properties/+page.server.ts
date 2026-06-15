import { getProperties } from '$lib/packages/properties/properties.service.server';

export async function load() {
	return {
		properties: await getProperties()
	};
}
