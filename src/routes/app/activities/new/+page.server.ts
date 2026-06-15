import { fail, redirect } from '@sveltejs/kit';
import { createActivityRecord } from '$lib/packages/activities/activities.service.server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const activityReference = String(formData.get('activityReference') ?? '').trim();
		const activityTypeCode = String(formData.get('activityTypeCode') ?? '').trim();
		const activityName = String(formData.get('activityName') ?? '').trim();
		const priorityCode = String(formData.get('priorityCode') ?? 'NORMAL').trim();
		const description = String(formData.get('description') ?? '').trim();

		if (!activityReference || !activityTypeCode || !activityName) {
			return fail(400, {
				message: 'Activity reference, type and name are required.',
				values: Object.fromEntries(formData)
			});
		}

		await createActivityRecord({
			activityReference,
			activityTypeCode,
			activityName,
			priorityCode,
			description: description || null
		});

		throw redirect(303, '/app/activities');
	}
};
