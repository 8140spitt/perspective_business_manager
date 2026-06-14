import { listProperties } from '$lib/packages/properties/properties.repository.server';

export async function load() {
	return {
		properties: await listProperties()
	};
}
