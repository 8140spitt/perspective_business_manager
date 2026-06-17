import { fail, redirect } from '@sveltejs/kit';
import {
	convertEnquiryToOpportunity,
	listSalesLifecycleRecords
} from '$lib/packages/commercial/commercial.service.server';

export async function load() {
	const records = await listSalesLifecycleRecords();

	return {
		enquiries: records.filter((record) => record.objectType === 'enquiry')
	};
}

export const actions = {
	convertToOpportunity: async ({ request }) => {
		const formData = await request.formData();
		const enquiryId = Number(formData.get('enquiryId') ?? 0);

		if (!enquiryId) {
			return fail(400, {
				message: 'A valid enquiry is required.'
			});
		}

		const opportunityId = await convertEnquiryToOpportunity(enquiryId);

		throw redirect(303, `/app/sales/opportunities/${opportunityId}`);
	}
};
