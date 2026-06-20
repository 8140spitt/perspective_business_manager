import { organisationService } from '$lib/packages/organisation';

export async function load() {
	const positions = await organisationService.listOrgPositions();

	return {
		positions
	};
}
