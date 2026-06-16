import { fail, redirect } from '@sveltejs/kit';
import { getClientAccounts } from '$lib/packages/client-accounts/client-accounts.service.server';
import { createInstructionRecord } from '$lib/packages/instructions/instructions.service.server';

export async function load() {
	return {
		clientAccounts: await getClientAccounts()
	};
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const instructionReference = String(formData.get('instructionReference') ?? '').trim();
		const clientAccountId = Number(formData.get('clientAccountId') ?? 0);
		const instructionTypeCode = String(formData.get('instructionTypeCode') ?? '').trim();
		const serviceLineCode = String(formData.get('serviceLineCode') ?? '').trim();
		const priorityCode = String(formData.get('priorityCode') ?? 'NORMAL').trim();
		const title = String(formData.get('title') ?? '').trim();
		const summary = String(formData.get('summary') ?? '').trim();
		const receivedAt = String(formData.get('receivedAt') ?? '').trim();
		const targetIssueDate = String(formData.get('targetIssueDate') ?? '').trim();

		if (!clientAccountId || !instructionTypeCode || !serviceLineCode || !title) {
			return fail(400, {
				message: 'Client account, instruction type, service line and title are required.',
				values: Object.fromEntries(formData)
			});
		}

		const instructionId = await createInstructionRecord({
			instructionReference: instructionReference || null,
			clientAccountId,
			instructionTypeCode,
			serviceLineCode,
			priorityCode,
			title,
			summary: summary || null,
			receivedAt: receivedAt || null,
			targetIssueDate: targetIssueDate || null
		});

		throw redirect(303, `/app/operations/instructions/${instructionId}/overview`);
	}
};
