import { error } from '@sveltejs/kit';
import { getActivityWorkspace } from '$lib/packages/activities/activities.service.server';

export async function load({ params }) {
	const activityId = Number(params.activityId);

	if (!Number.isInteger(activityId)) {
		throw error(400, 'Invalid activity ID');
	}

	try {
		return {
			workspace: await getActivityWorkspace(activityId)
		};
	} catch {
		throw error(404, 'Activity not found');
	}
}
