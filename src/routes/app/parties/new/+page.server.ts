import { fail, redirect } from '@sveltejs/kit';
import { createOrganisation } from '$lib/packages/parties/parties.repository.server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const organisationName = String(formData.get('organisationName') ?? '').trim();
		const organisationNumber = String(formData.get('organisationNumber') ?? '').trim();
		const vatNumber = String(formData.get('vatNumber') ?? '').trim();

		if (!organisationName) {
			return fail(400, {
				message: 'Organisation name is required.',
				values: {
					organisationName,
					organisationNumber,
					vatNumber
				}
			});
		}

		const partyId = await createOrganisation({
			displayName: organisationName,
			organisationName,
			organisationNumber: organisationNumber || null,
			vatNumber: vatNumber || null,
			organisationTypeCode: null
		});

		throw redirect(303, `/app/parties/${partyId}`);
	}
};
