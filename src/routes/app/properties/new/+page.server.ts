import { fail, redirect } from '@sveltejs/kit';
import { createProperty } from '$lib/packages/properties/properties.repository.server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const propertyName = String(formData.get('propertyName') ?? '').trim();
		const addressLine1 = String(formData.get('addressLine1') ?? '').trim();
		const addressLine2 = String(formData.get('addressLine2') ?? '').trim();
		const townCity = String(formData.get('townCity') ?? '').trim();
		const countyRegion = String(formData.get('countyRegion') ?? '').trim();
		const postcode = String(formData.get('postcode') ?? '').trim();

		if (!addressLine1) {
			return fail(400, {
				message: 'Address line 1 is required.',
				values: {
					propertyName,
					addressLine1,
					addressLine2,
					townCity,
					countyRegion,
					postcode
				}
			});
		}

		const propertyId = await createProperty({
			propertyName: propertyName || null,
			addressLine1,
			addressLine2: addressLine2 || null,
			townCity: townCity || null,
			countyRegion: countyRegion || null,
			postcode: postcode || null
		});

		throw redirect(303, `/app/properties/${propertyId}`);
	}
};
