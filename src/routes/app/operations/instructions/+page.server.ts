import { getInstructions } from '$lib/packages/instructions/instructions.service.server';

export async function load() {
	return {
		instructions: await getInstructions()
	};
}
