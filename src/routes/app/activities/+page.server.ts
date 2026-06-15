import { getActivities } from '$lib/packages/activities/activities.service.server';

export async function load() {
	return {
		activities: await getActivities()
	};
}
