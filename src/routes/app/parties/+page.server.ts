import { listParties } from '$lib/packages/parties/parties.repository.server';

export async function load() {
	return {
		parties: await listParties()
	};
}
