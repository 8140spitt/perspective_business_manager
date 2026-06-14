import { error, fail, redirect } from '@sveltejs/kit';
import { createClientContact, getPartyById } from '$lib/packages/parties/parties.repository.server';

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

		const firstName = String(formData.get('firstName') ?? '').trim();
		const lastName = String(formData.get('lastName') ?? '').trim();
		const relationshipLabel = String(formData.get('relationshipLabel') ?? '').trim();
		const isPrimary = formData.get('isPrimary') === 'on';

		if (!firstName || !lastName) {
			return fail(400, {
				message: 'First name and last name are required.',
				values: Object.fromEntries(formData)
			});
		}

		await createClientContact({
			clientId,
			firstName,
			lastName,
			relationshipLabel: relationshipLabel || null,
			isPrimary
		});

		throw redirect(303, `/app/crm/clients/${clientId}/contacts/all`);
	}
};
