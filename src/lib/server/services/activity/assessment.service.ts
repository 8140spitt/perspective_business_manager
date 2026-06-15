import {
	createAssessment,
	deleteAssessment,
	getAssessmentById,
	listAssessments,
	updateAssessment,
	type Assessment,
	type CreateAssessmentInput,
	type UpdateAssessmentInput
} from '$lib/server/repositories/activity/assessment.repository';

function requireText(value: string | undefined, fieldName: string) {
	if (!value?.trim()) {
		throw new Error(`${fieldName} is required.`);
	}
}

export async function getAssessments(observationId?: number): Promise<Assessment[]> {
	return listAssessments(observationId);
}

export async function getAssessment(assessmentId: number): Promise<Assessment> {
	const assessment = await getAssessmentById(assessmentId);

	if (!assessment) {
		throw new Error('Assessment not found.');
	}

	return assessment;
}

export async function createAssessmentRecord(input: CreateAssessmentInput): Promise<number> {
	if (!input.observationId) {
		throw new Error('Observation ID is required.');
	}

	requireText(input.assessmentReference, 'Assessment reference');
	requireText(input.assessmentTypeCode, 'Assessment type');
	requireText(input.title, 'Assessment title');

	return createAssessment(input);
}

export async function updateAssessmentRecord(input: UpdateAssessmentInput): Promise<void> {
	if (!input.assessmentId) {
		throw new Error('Assessment ID is required.');
	}

	await updateAssessment(input);
}

export async function deleteAssessmentRecord(assessmentId: number): Promise<void> {
	if (!assessmentId) {
		throw new Error('Assessment ID is required.');
	}

	await deleteAssessment(assessmentId);
}
