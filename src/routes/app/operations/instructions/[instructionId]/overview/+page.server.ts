import { error } from '@sveltejs/kit';
import { getInstruction } from '$lib/packages/instructions/instructions.service.server';

export async function load({ params }) {
	const instructionId = Number(params.instructionId);

	if (!Number.isInteger(instructionId)) {
		throw error(400, 'Invalid instruction ID');
	}

	try {
		return {
			instruction: await getInstruction(instructionId)
		};
	} catch {
		throw error(404, 'Instruction not found');
	}
}
