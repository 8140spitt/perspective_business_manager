import {
	createActivity,
	deleteActivity,
	getActivityById,
	listActivities,
	updateActivity,
	type Activity,
	type CreateActivityInput,
	type UpdateActivityInput
} from '$lib/server/repositories/activity/activity.repository';

function requireText(value: string | undefined, fieldName: string) {
	if (!value?.trim()) {
		throw new Error(`${fieldName} is required.`);
	}
}

export async function getActivities(): Promise<Activity[]> {
	return listActivities();
}

export async function getActivity(activityId: number): Promise<Activity> {
	const activity = await getActivityById(activityId);

	if (!activity) {
		throw new Error('Activity not found.');
	}

	return activity;
}

export async function createActivityRecord(input: CreateActivityInput): Promise<number> {
	requireText(input.activityReference, 'Activity reference');
	requireText(input.activityTypeCode, 'Activity type');
	requireText(input.activityName, 'Activity name');

	return createActivity(input);
}

export async function updateActivityRecord(input: UpdateActivityInput): Promise<void> {
	if (!input.activityId) {
		throw new Error('Activity ID is required.');
	}

	await updateActivity(input);
}

export async function deleteActivityRecord(activityId: number): Promise<void> {
	if (!activityId) {
		throw new Error('Activity ID is required.');
	}

	await deleteActivity(activityId);
}
