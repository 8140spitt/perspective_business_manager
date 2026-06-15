import type { CreateClientAccountInput } from './client-accounts.types';

export function validateCreateClientAccount(input: CreateClientAccountInput): void {
	if (!input.partyId) {
		throw new Error('Party ID is required.');
	}
}
