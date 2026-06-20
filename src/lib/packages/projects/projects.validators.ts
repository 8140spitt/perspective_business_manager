import type { CreateProjectInput, TransitionProjectStateInput } from './projects.types';

export function assertCreateProjectInput(input: CreateProjectInput): void {
	if (!input.projectName?.trim()) {
		throw new Error('Project name is required.');
	}
}

export function assertTransitionProjectStateInput(input: TransitionProjectStateInput): void {
	if (!Number.isFinite(input.projectId) || input.projectId <= 0) {
		throw new Error('A valid project id is required.');
	}

	if (!input.toStateCode?.trim()) {
		throw new Error('Target project state is required.');
	}
}

export const projectValidators = {
	assertCreateProjectInput,
	assertTransitionProjectStateInput
};
