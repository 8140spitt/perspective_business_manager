import { error } from '@sveltejs/kit';
import { getParty } from '$lib/packages/parties/parties.service.server';
import { getClientProperties } from '$lib/packages/properties/properties.service.server';

export async function load({ params }) {
	const clientId = Number(params.clientId);

	if (!Number.isInteger(clientId)) {
		throw error(400, 'Invalid client ID');
	}

	try {
		return {
			client: await getParty(clientId),
			properties: await getClientProperties(clientId)
		};
	} catch {
		throw error(404, 'Client not found');
	}
}
