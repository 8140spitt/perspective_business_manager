import { error } from '@sveltejs/kit';
import { getPropertyById } from '$lib/packages/properties/properties.repository.server';

export async function load({ params }) {
	const propertyId = Number(params.propertyId);

	if (!Number.isInteger(propertyId)) {
		throw error(400, 'Invalid property ID');
	}

	const property = await getPropertyById(propertyId);

	if (!property) {
		throw error(404, 'Property not found');
	}

	return {
		property
	};
}
