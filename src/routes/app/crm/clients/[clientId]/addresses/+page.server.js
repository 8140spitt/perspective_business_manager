import { error } from '@sveltejs/kit';
import { getPartyById, listClientAddresses } from '$lib/packages/parties/parties.repository.server';

export async function load({ params }) {
	const clientId = Number(params.clientId);

	if (!Number.isInteger(clientId)) {
		throw error(400, 'Invalid client ID');
	}

	const client = await getPartyById(clientId);

	if (!client) {
		throw error(404, 'Client not found');
	}

	return {
		client,
		addresses: await listClientAddresses(clientId)
	};
}
