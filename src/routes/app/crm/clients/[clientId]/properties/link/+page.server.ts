import { error, fail, redirect } from '@sveltejs/kit';
import { getParty } from '$lib/packages/parties/parties.service.server';
import {
	getPropertiesForSelection,
	linkClientPropertyRecord
} from '$lib/packages/properties/properties.service.server';

export async function load({ params }) {
	const clientId = Number(params.clientId);

	if (!Number.isInteger(clientId)) {
		throw error(400, 'Invalid client ID');
	}

	try {
		return {
			client: await getParty(clientId),
			properties: await getPropertiesForSelection()
		};
	} catch {
		throw error(404, 'Client not found');
	}
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

		try {
			await linkClientPropertyRecord({
				clientId,
				propertyId,
				roleCode,
				relationshipLabel: relationshipLabel || null,
				isPrimary
			});
		} catch (error) {
			return fail(400, {
				message: error instanceof Error ? error.message : 'Unable to link property.',
				values: Object.fromEntries(formData)
			});
		}

		throw redirect(303, `/app/crm/clients/${clientId}/properties`);
	}
};
