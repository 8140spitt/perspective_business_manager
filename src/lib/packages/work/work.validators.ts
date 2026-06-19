import { WORK_CONTAINER_TYPE_CODES } from './work.constants';
import type { CreateWorkContainerInput, CreateWorkInstructionInput, CreateWorkServiceInput } from './work.types';

type ValidationResult = {
	success: boolean;
	issues: string[];
};

function hasText(value: unknown): value is string {
	return typeof value === 'string' && value.trim().length > 0;
}

export function validateCreateWorkContainerInput(input: CreateWorkContainerInput): ValidationResult {
	const issues: string[] = [];

	if (!hasText(input.title)) {
		issues.push('A work container title is required.');
	}

	if (!hasText(input.typeCode)) {
		issues.push('A work container type is required.');
	}

	if (hasText(input.typeCode) && !WORK_CONTAINER_TYPE_CODES.includes(input.typeCode as never)) {
		issues.push('The work container type is not recognised.');
	}

	return {
		success: issues.length === 0,
		issues
	};
}

export function validateCreateWorkServiceInput(input: CreateWorkServiceInput): ValidationResult {
	const issues: string[] = [];

	if (!hasText(input.serviceCode)) {
		issues.push('A service code is required.');
	}

	if (!hasText(input.serviceName)) {
		issues.push('A service name is required.');
	}

	return {
		success: issues.length === 0,
		issues
	};
}

export function validateCreateWorkInstructionInput(input: CreateWorkInstructionInput): ValidationResult {
	const issues: string[] = [];

	if (!Number.isFinite(input.workContainerId) || input.workContainerId <= 0) {
		issues.push('A valid work container is required.');
	}

	if (!hasText(input.title)) {
		issues.push('An instruction title is required.');
	}

	return {
		success: issues.length === 0,
		issues
	};
}
