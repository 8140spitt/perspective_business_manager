import { error } from '@sveltejs/kit';
import { getPartyById } from '$lib/packages/parties/parties.repository.server';
import { listClientProperties } from '$lib/packages/properties/properties.repository.server';

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
		properties: await listClientProperties(clientId)
	};
}
