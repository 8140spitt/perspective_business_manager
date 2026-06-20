import { organisationService } from '$lib/packages/organisation';

export async function load() {
	const profile = await organisationService.getTenantBusinessProfile();

	return {
		profile
	};
}
