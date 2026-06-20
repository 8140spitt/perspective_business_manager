import { organisationService } from '$lib/packages/organisation';

export async function load() {
	const workspace = await organisationService.getOrganisationWorkspace();

	return {
		workspace
	};
}
