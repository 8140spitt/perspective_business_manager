import type { CreateInstructionInput } from './instructions.types';

function requireText(value: string | undefined | null, fieldName: string): void {
	if (!value?.trim()) {
		throw new Error(`${fieldName} is required.`);
	}
}

function requireId(value: number | undefined | null, fieldName: string): void {
	if (!value || !Number.isInteger(value) || value < 1) {
		throw new Error(`${fieldName} is required.`);
	}
}

export function validateCreateInstruction(input: CreateInstructionInput): void {
	requireId(input.clientAccountId, 'Client account');
	requireText(input.instructionTypeCode, 'Instruction type');
	requireText(input.serviceLineCode, 'Service line');
	requireText(input.title, 'Instruction title');
}
