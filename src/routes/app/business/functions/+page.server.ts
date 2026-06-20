import { organisationService } from '$lib/packages/organisation';

export async function load() {
	const functions = await organisationService.listFunctions();

	return {
		functions
	};
}
