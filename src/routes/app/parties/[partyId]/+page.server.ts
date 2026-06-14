import { error } from '@sveltejs/kit';
import { getPartyById } from '$lib/packages/parties/parties.repository.server';

export async function load({ params }) {
	const partyId = Number(params.partyId);

	if (!Number.isInteger(partyId)) {
		throw error(400, 'Invalid party ID');
	}

	const party = await getPartyById(partyId);

	if (!party) {
		throw error(404, 'Party not found');
	}

	return {
		party
	};
}
