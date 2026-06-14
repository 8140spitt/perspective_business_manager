import { error, fail, redirect } from '@sveltejs/kit';
import { getPartyById } from '$lib/packages/parties/parties.repository.server';
import {
	linkClientProperty,
	listPropertiesForSelection
} from '$lib/packages/properties/properties.repository.server';

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
		client,
		properties: await listPropertiesForSelection()
	};
}

export const actions = {
	default: async ({ params, request }) => {
		const clientId = Number(params.clientId);

		if (!Number.isInteger(clientId)) {
			throw error(400, 'Invalid client ID');
		}

		const formData = await request.formData();

		const propertyId = Number(formData.get('propertyId'));
		const roleCode = String(formData.get('roleCode') ?? 'CLIENT_INTEREST').trim();
		const relationshipLabel = String(formData.get('relationshipLabel') ?? '').trim();
		const isPrimary = formData.get('isPrimary') === 'on';

		if (!Number.isInteger(propertyId)) {
			return fail(400, {
				message: 'Please select a property.',
				values: Object.fromEntries(formData)
			});
		}

		await linkClientProperty({
			clientId,
			propertyId,
			roleCode,
			relationshipLabel: relationshipLabel || null,
			isPrimary
		});

		throw redirect(303, `/app/crm/clients/${clientId}/properties`);
	}
};
