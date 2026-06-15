import { error } from '@sveltejs/kit';
import { getProperty } from '$lib/packages/properties/properties.service.server';

export async function load({ params }) {
	const propertyId = Number(params.propertyId);

	if (!Number.isInteger(propertyId)) {
		throw error(400, 'Invalid property ID');
	}

	try {
		return {
			property: await getProperty(propertyId)
		};
	} catch {
		throw error(404, 'Property not found');
	}
}
