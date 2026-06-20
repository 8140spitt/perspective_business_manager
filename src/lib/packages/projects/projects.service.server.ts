import {
	createProject,
	getProjectById,
	getProjectDashboard,
	listProjectCommercialSummaries,
	transitionProjectState
} from './projects.repository.server';
import { assertCreateProjectInput, assertTransitionProjectStateInput } from './projects.validators';
import type { CreateProjectInput, ProjectDashboard, ProjectRecord, TransitionProjectStateInput } from './projects.types';

export async function listProjects() {
	return listProjectCommercialSummaries();
}

export async function getProject(projectId: number): Promise<ProjectRecord | null> {
	return getProjectById(projectId);
}

export async function getDashboard(projectId: number): Promise<ProjectDashboard> {
	return getProjectDashboard(projectId);
}

export async function createNewProject(input: CreateProjectInput): Promise<number> {
	assertCreateProjectInput(input);
	return createProject(input);
}

export async function changeProjectState(input: TransitionProjectStateInput): Promise<void> {
	assertTransitionProjectStateInput(input);
	await transitionProjectState(input);
}

export const projectsService = {
	listProjects,
	getProject,
	getDashboard,
	createNewProject,
	changeProjectState
};
