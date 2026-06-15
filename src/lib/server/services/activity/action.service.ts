import {
	createAction,
	deleteAction,
	getActionById,
	listActions,
	updateAction,
	type ActivityAction,
	type CreateActionInput,
	type UpdateActionInput
} from '$lib/server/repositories/activity/action.repository';

function requireText(value: string | undefined, fieldName: string) {
	if (!value?.trim()) {
		throw new Error(`${fieldName} is required.`);
	}
}

export async function getActions(assessmentId?: number): Promise<ActivityAction[]> {
	return listActions(assessmentId);
}

export async function getAction(actionId: number): Promise<ActivityAction> {
	const action = await getActionById(actionId);

	if (!action) {
		throw new Error('Action not found.');
	}

	return action;
}

export async function createActionRecord(input: CreateActionInput): Promise<number> {
	if (!input.assessmentId) {
		throw new Error('Assessment ID is required.');
	}

	requireText(input.actionReference, 'Action reference');
	requireText(input.actionTypeCode, 'Action type');
	requireText(input.title, 'Action title');

	return createAction(input);
}

export async function updateActionRecord(input: UpdateActionInput): Promise<void> {
	if (!input.actionId) {
		throw new Error('Action ID is required.');
	}

	await updateAction(input);
}

export async function deleteActionRecord(actionId: number): Promise<void> {
	if (!actionId) {
		throw new Error('Action ID is required.');
	}

	await deleteAction(actionId);
}
