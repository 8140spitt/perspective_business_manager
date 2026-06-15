import { error, fail, redirect } from '@sveltejs/kit';
import {
	createObservationRecord,
	getActivity
} from '$lib/packages/activities/activities.service.server';

export async function load({ params }) {
	const activityId = Number(params.activityId);

	if (!Number.isInteger(activityId)) {
		throw error(400, 'Invalid activity ID');
	}

	try {
		return {
			activity: await getActivity(activityId)
		};
	} catch {
		throw error(404, 'Activity not found');
	}
}

export const actions = {
	default: async ({ params, request }) => {
		const activityId = Number(params.activityId);

		if (!Number.isInteger(activityId)) {
			return fail(400, { message: 'Invalid activity ID.' });
		}

		const formData = await request.formData();
		const observationReference = String(formData.get('observationReference') ?? '').trim();
		const observationTypeCode = String(formData.get('observationTypeCode') ?? '').trim();
		const title = String(formData.get('title') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();

		if (!observationReference || !observationTypeCode || !title) {
			return fail(400, {
				message: 'Observation reference, type and title are required.',
				values: Object.fromEntries(formData)
			});
		}

		await createObservationRecord({
			observationReference,
			activityId,
			observationTypeCode,
			title,
			description: description || null
		});

		throw redirect(303, `/app/activities/${activityId}`);
	}
};
