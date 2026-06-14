import { listClients } from '$lib/packages/parties/parties.repository.server';

export async function load() {
	return {
		clients: await listClients()
	};
}
