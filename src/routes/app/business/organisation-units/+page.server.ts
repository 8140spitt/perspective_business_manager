import { organisationService } from '$lib/packages/organisation';

export async function load() {
	const units = await organisationService.listUnits();

	return {
		units
	};
}
