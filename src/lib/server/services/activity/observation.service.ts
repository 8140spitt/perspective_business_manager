import {
	createObservation,
	deleteObservation,
	getObservationById,
	listObservations,
	updateObservation,
	type CreateObservationInput,
	type Observation,
	type UpdateObservationInput
} from '$lib/server/repositories/activity/observation.repository';

function requireText(value: string | undefined, fieldName: string) {
	if (!value?.trim()) {
		throw new Error(`${fieldName} is required.`);
	}
}

export async function getObservations(activityId?: number): Promise<Observation[]> {
	return listObservations(activityId);
}

export async function getObservation(observationId: number): Promise<Observation> {
	const observation = await getObservationById(observationId);

	if (!observation) {
		throw new Error('Observation not found.');
	}

	return observation;
}

export async function createObservationRecord(input: CreateObservationInput): Promise<number> {
	if (!input.activityId) {
		throw new Error('Activity ID is required.');
	}

	requireText(input.observationReference, 'Observation reference');
	requireText(input.observationTypeCode, 'Observation type');
	requireText(input.title, 'Observation title');

	return createObservation(input);
}

export async function updateObservationRecord(input: UpdateObservationInput): Promise<void> {
	if (!input.observationId) {
		throw new Error('Observation ID is required.');
	}

	await updateObservation(input);
}

export async function deleteObservationRecord(observationId: number): Promise<void> {
	if (!observationId) {
		throw new Error('Observation ID is required.');
	}

	await deleteObservation(observationId);
}
