import type { CreateClientInput } from './parties.types';

export function validateCreateClient(input: CreateClientInput): void {
	if (input.clientType !== 'ORGANISATION' && input.clientType !== 'PERSON') {
		throw new Error('Invalid client type.');
	}

	if (input.clientType === 'ORGANISATION' && !input.organisationName?.trim()) {
		throw new Error('Organisation name is required.');
	}

	if (input.clientType === 'PERSON') {
		if (!input.firstName?.trim() || !input.lastName?.trim()) {
			throw new Error('First name and last name are required.');
		}
	}

	if (!input.displayName?.trim()) {
		throw new Error('Display name is required.');
	}
}
