import { fail, redirect } from '@sveltejs/kit';
import { createPropertyRecord } from '$lib/packages/properties/properties.service.server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const propertyName = String(formData.get('propertyName') ?? '').trim();
		const addressLine1 = String(formData.get('addressLine1') ?? '').trim();
		const addressLine2 = String(formData.get('addressLine2') ?? '').trim();
		const townCity = String(formData.get('townCity') ?? '').trim();
		const countyRegion = String(formData.get('countyRegion') ?? '').trim();
		const postcode = String(formData.get('postcode') ?? '').trim();

		let propertyId: number;

		try {
			propertyId = await createPropertyRecord({
				propertyName: propertyName || null,
				addressLine1,
				addressLine2: addressLine2 || null,
				townCity: townCity || null,
				countyRegion: countyRegion || null,
				postcode: postcode || null
			});
		} catch (error) {
			return fail(400, {
				message: error instanceof Error ? error.message : 'Unable to create property.',
				values: Object.fromEntries(formData)
			});
		}

		throw redirect(303, `/app/properties/${propertyId}`);
	}
};
