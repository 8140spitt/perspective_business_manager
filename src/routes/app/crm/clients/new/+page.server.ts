import { fail, redirect } from '@sveltejs/kit';
import { createClient } from '$lib/packages/parties/parties.repository.server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const clientType = String(formData.get('clientType') ?? 'ORGANISATION');
		const organisationName = String(formData.get('organisationName') ?? '').trim();
		const organisationNumber = String(formData.get('organisationNumber') ?? '').trim();
		const vatNumber = String(formData.get('vatNumber') ?? '').trim();
		const firstName = String(formData.get('firstName') ?? '').trim();
		const lastName = String(formData.get('lastName') ?? '').trim();

		if (clientType !== 'ORGANISATION' && clientType !== 'PERSON') {
			return fail(400, { message: 'Invalid client type.' });
		}

		if (clientType === 'ORGANISATION' && !organisationName) {
			return fail(400, {
				message: 'Organisation name is required.',
				values: Object.fromEntries(formData)
			});
		}

		if (clientType === 'PERSON' && (!firstName || !lastName)) {
			return fail(400, {
				message: 'First name and last name are required.',
				values: Object.fromEntries(formData)
			});
		}

		const displayName =
			clientType === 'ORGANISATION' ? organisationName : `${firstName} ${lastName}`;

		const clientId = await createClient({
			clientType,
			displayName,
			organisationName,
			organisationNumber: organisationNumber || null,
			vatNumber: vatNumber || null,
			firstName,
			lastName
		});

		throw redirect(303, `/app/crm/clients/${clientId}/overview`);
	}
};
