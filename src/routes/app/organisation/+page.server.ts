import { getOrganisationWorkspace } from '$lib/packages/organisation/organisation.service.server';

export async function load() {
	return {
		workspace: await getOrganisationWorkspace()
	};
}
