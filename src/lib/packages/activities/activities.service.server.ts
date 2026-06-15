import {
	createAction,
	createActivity,
	createAssessment,
	createObservation,
	createOutcome,
	getActionById,
	getActivityById,
	getAssessmentById,
	getObservationById,
	getOutcomeById,
	listActions,
	listActivities,
	listAssessments,
	listObservations,
	listOutcomes
} from './activities.repository.server';
import type {
	Activity,
	ActivityAction,
	ActivityWorkspace,
	Assessment,
	CreateActionInput,
	CreateActivityInput,
	CreateAssessmentInput,
	CreateObservationInput,
	CreateOutcomeInput,
	Observation,
	Outcome
} from './activities.types';
import { requireId, requireText } from './activities.validators';

export async function getActivities(): Promise<Activity[]> {
	return listActivities();
}

export async function getActivity(activityId: number): Promise<Activity> {
	const activity = await getActivityById(activityId);
	if (!activity) throw new Error('Activity not found.');
	return activity;
}

export async function getActivityWorkspace(activityId: number): Promise<ActivityWorkspace> {
	const [activity, observations, outcomes] = await Promise.all([
		getActivity(activityId),
		getObservations(activityId),
		getOutcomes({ activityId })
	]);

	const observationGroups = await Promise.all(
		observations.map(async (observation) => {
			const assessments = await getAssessments(observation.observationId);
			const assessmentGroups = await Promise.all(
				assessments.map(async (assessment) => ({
					assessment,
					actions: await getActions(assessment.assessmentId)
				}))
			);

			return {
				observation,
				assessments: assessmentGroups
			};
		})
	);

	return {
		activity,
		observations: observationGroups,
		outcomes
	};
}

export async function createActivityRecord(input: CreateActivityInput): Promise<number> {
	requireText(input.activityReference, 'Activity reference');
	requireText(input.activityTypeCode, 'Activity type');
	requireText(input.activityName, 'Activity name');
	return createActivity(input);
}

export async function getObservations(activityId?: number): Promise<Observation[]> {
	return listObservations(activityId);
}

export async function getObservation(observationId: number): Promise<Observation> {
	const observation = await getObservationById(observationId);
	if (!observation) throw new Error('Observation not found.');
	return observation;
}

export async function createObservationRecord(input: CreateObservationInput): Promise<number> {
	requireId(input.activityId, 'Activity ID');
	requireText(input.observationReference, 'Observation reference');
	requireText(input.observationTypeCode, 'Observation type');
	requireText(input.title, 'Observation title');
	return createObservation(input);
}

export async function getAssessments(observationId?: number): Promise<Assessment[]> {
	return listAssessments(observationId);
}

export async function getAssessment(assessmentId: number): Promise<Assessment> {
	const assessment = await getAssessmentById(assessmentId);
	if (!assessment) throw new Error('Assessment not found.');
	return assessment;
}

export async function createAssessmentRecord(input: CreateAssessmentInput): Promise<number> {
	requireId(input.observationId, 'Observation ID');
	requireText(input.assessmentReference, 'Assessment reference');
	requireText(input.assessmentTypeCode, 'Assessment type');
	requireText(input.title, 'Assessment title');
	return createAssessment(input);
}

export async function getActions(assessmentId?: number): Promise<ActivityAction[]> {
	return listActions(assessmentId);
}

export async function getAction(actionId: number): Promise<ActivityAction> {
	const action = await getActionById(actionId);
	if (!action) throw new Error('Action not found.');
	return action;
}

export async function createActionRecord(input: CreateActionInput): Promise<number> {
	requireId(input.assessmentId, 'Assessment ID');
	requireText(input.actionReference, 'Action reference');
	requireText(input.actionTypeCode, 'Action type');
	requireText(input.title, 'Action title');
	return createAction(input);
}

export async function getOutcomes(
	filters: { activityId?: number; actionId?: number } = {}
): Promise<Outcome[]> {
	return listOutcomes(filters);
}

export async function getOutcome(outcomeId: number): Promise<Outcome> {
	const outcome = await getOutcomeById(outcomeId);
	if (!outcome) throw new Error('Outcome not found.');
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
