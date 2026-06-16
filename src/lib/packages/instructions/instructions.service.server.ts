import {
	createInstruction,
	getInstructionById,
	listInstructions
} from './instructions.repository.server';
import type { CreateInstructionInput, Instruction } from './instructions.types';
import { validateCreateInstruction } from './instructions.validators';

export async function getInstructions(): Promise<Instruction[]> {
	return listInstructions();
}

export async function getInstruction(instructionId: number): Promise<Instruction> {
	const instruction = await getInstructionById(instructionId);

	if (!instruction) {
		throw new Error('Instruction not found.');
	}

	return instruction;
}

export async function createInstructionRecord(input: CreateInstructionInput): Promise<number> {
	validateCreateInstruction(input);
	return createInstruction(input);
}
