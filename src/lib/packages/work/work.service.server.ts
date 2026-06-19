import { workRepository } from './work.repository.server';
import type {
	CreateWorkContainerInput,
	CreateWorkInstructionInput,
	CreateWorkServiceInput,
	WorkContainerRecord,
	WorkInstructionRecord,
	WorkServiceRecord
} from './work.types';
import {
	validateCreateWorkContainerInput,
	validateCreateWorkInstructionInput,
	validateCreateWorkServiceInput
} from './work.validators';

function assertValid(result: { success: boolean; issues: string[] }): void {
	if (!result.success) {
		throw new Error(result.issues.join(' '));
	}
}

export async function listWorkContainers(): Promise<WorkContainerRecord[]> {
	return workRepository.listContainers();
}

export async function getWorkContainerById(id: number): Promise<WorkContainerRecord | null> {
	return workRepository.getContainerById(id);
}

export async function createWorkContainer(input: CreateWorkContainerInput): Promise<number> {
	assertValid(validateCreateWorkContainerInput(input));
	return workRepository.createContainer(input);
}

export async function listWorkServices(): Promise<WorkServiceRecord[]> {
	return workRepository.listServices();
}

export async function createWorkService(input: CreateWorkServiceInput): Promise<number> {
	assertValid(validateCreateWorkServiceInput(input));
	return workRepository.createService(input);
}

export async function listWorkInstructions(workContainerId: number): Promise<WorkInstructionRecord[]> {
	return workRepository.listInstructions(workContainerId);
}

export async function createWorkInstruction(input: CreateWorkInstructionInput): Promise<number> {
	assertValid(validateCreateWorkInstructionInput(input));
	return workRepository.createInstruction(input);
}

export const workService = {
	listContainers: listWorkContainers,
	getContainerById: getWorkContainerById,
	createContainer: createWorkContainer,
	listServices: listWorkServices,
	createService: createWorkService,
	listInstructions: listWorkInstructions,
	createInstruction: createWorkInstruction
};
