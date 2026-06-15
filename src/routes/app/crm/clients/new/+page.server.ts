import { fail, redirect } from '@sveltejs/kit';
import { createClientRecord } from '$lib/packages/parties/parties.service.server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const clientType = String(formData.get('clientType') ?? 'ORGANISATION');
		const organisationName = String(formData.get('organisationName') ?? '').trim();
		const organisationNumber = String(formData.get('organisationNumber') ?? '').trim();
		const vatNumber = String(formData.get('vatNumber') ?? '').trim();
		const firstName = String(formData.get('firstName') ?? '').trim();
		const lastName = String(formData.get('lastName') ?? '').trim();
		const displayName = clientType === 'ORGANISATION' ? organisationName : `${firstName} ${lastName}`.trim();

		let clientId: number;

		try {
			clientId = await createClientRecord({
				clientType: clientType === 'PERSON' ? 'PERSON' : 'ORGANISATION',
				displayName,
				organisationName,
				organisationNumber: organisationNumber || null,
				vatNumber: vatNumber || null,
				firstName,
				lastName
			});
		} catch (error) {
			return fail(400, {
				message: error instanceof Error ? error.message : 'Unable to create client.',
				values: Object.fromEntries(formData)
			});
		}

		throw redirect(303, `/app/crm/clients/${clientId}/overview`);
	}
};
