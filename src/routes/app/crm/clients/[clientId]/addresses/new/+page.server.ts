import { error, fail, redirect } from '@sveltejs/kit';
import { createClientAddress, getPartyById } from '$lib/packages/parties/parties.repository.server';

export async function load({ params }) {
	const clientId = Number(params.clientId);

	if (!Number.isInteger(clientId)) {
		throw error(400, 'Invalid client ID');
	}

	const client = await getPartyById(clientId);

	if (!client) {
		throw error(404, 'Client not found');
	}

	return {
		client
	};
}

export const actions = {
	default: async ({ params, request }) => {
		const clientId = Number(params.clientId);

		if (!Number.isInteger(clientId)) {
			throw error(400, 'Invalid client ID');
		}

		const formData = await request.formData();

		const addressTypeCode = String(formData.get('addressTypeCode') ?? 'CORRESPONDENCE').trim();
		const addressLine1 = String(formData.get('addressLine1') ?? '').trim();
		const addressLine2 = String(formData.get('addressLine2') ?? '').trim();
		const townCity = String(formData.get('townCity') ?? '').trim();
		const countyRegion = String(formData.get('countyRegion') ?? '').trim();
		const postcode = String(formData.get('postcode') ?? '').trim();
		const isPrimary = formData.get('isPrimary') === 'on';

		if (!addressLine1) {
			return fail(400, {
				message: 'Address line 1 is required.',
				values: Object.fromEntries(formData)
			});
		}

		await createClientAddress({
			clientId,
			addressTypeCode,
			addressLine1,
			addressLine2: addressLine2 || null,
			townCity: townCity || null,
			countyRegion: countyRegion || null,
			postcode: postcode || null,
			isPrimary
		});

		throw redirect(303, `/app/crm/clients/${clientId}/addresses`);
	}
};
