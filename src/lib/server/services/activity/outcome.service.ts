import {
	createOutcome,
	deleteOutcome,
	getOutcomeById,
	listOutcomes,
	updateOutcome,
	type CreateOutcomeInput,
	type Outcome,
	type UpdateOutcomeInput
} from '$lib/server/repositories/activity/outcome.repository';

function requireText(value: string | undefined, fieldName: string) {
	if (!value?.trim()) {
		throw new Error(`${fieldName} is required.`);
	}
}

export async function getOutcomes(filters: { activityId?: number; actionId?: number } = {}): Promise<Outcome[]> {
	return listOutcomes(filters);
}

export async function getOutcome(outcomeId: number): Promise<Outcome> {
	const outcome = await getOutcomeById(outcomeId);

	if (!outcome) {
		throw new Error('Outcome not found.');
	}

	return outcome;
}

export async function createOutcomeRecord(input: CreateOutcomeInput): Promise<number> {
	if (!input.activityId && !input.actionId && !input.deliverableId) {
		throw new Error('Outcome must be linked to an activity, action or deliverable.');
	}

	requireText(input.outcomeReference, 'Outcome reference');
	requireText(input.outcomeTypeCode, 'Outcome type');
	requireText(input.title, 'Outcome title');

	return createOutcome(input);
}

export async function updateOutcomeRecord(input: UpdateOutcomeInput): Promise<void> {
	if (!input.outcomeId) {
		throw new Error('Outcome ID is required.');
	}

	await updateOutcome(input);
}

export async function deleteOutcomeRecord(outcomeId: number): Promise<void> {
	if (!outcomeId) {
		throw new Error('Outcome ID is required.');
	}

	await deleteOutcome(outcomeId);
}
