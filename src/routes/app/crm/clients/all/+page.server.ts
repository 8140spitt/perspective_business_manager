import { getClients } from '$lib/packages/parties/parties.service.server';

export async function load() {
	return {
		clients: await getClients()
	};
}
