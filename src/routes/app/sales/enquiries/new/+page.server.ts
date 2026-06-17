import { fail, redirect } from '@sveltejs/kit';
import { getClientAccounts } from '$lib/packages/client-accounts/client-accounts.service.server';
import { createSalesLifecycleRecord } from '$lib/packages/commercial/commercial.service.server';

export async function load() {
	return {
		clientAccounts: await getClientAccounts()
	};
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const reference = String(formData.get('reference') ?? '').trim();
		const clientAccountId = Number(formData.get('clientAccountId') ?? 0);
		const title = String(formData.get('title') ?? '').trim();
		const summary = String(formData.get('summary') ?? '').trim();

		if (!clientAccountId || !title) {
			return fail(400, {
				message: 'Client account and title are required.',
				values: Object.fromEntries(formData)
			});
		}

		const enquiryId = await createSalesLifecycleRecord({
			objectType: 'enquiry',
			reference: reference || undefined,
			clientAccountId,
			title,
			summary: summary || null
		});

		throw redirect(303, `/app/sales/enquiries/${enquiryId}`);
	}
};