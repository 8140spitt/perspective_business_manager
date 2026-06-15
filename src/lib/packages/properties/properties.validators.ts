import type { CreatePropertyInput, LinkClientPropertyInput } from './properties.types';

export function validateCreateProperty(input: CreatePropertyInput): void {
	if (!input.addressLine1?.trim()) {
		throw new Error('Address line 1 is required.');
	}
}

export function validateLinkClientProperty(input: LinkClientPropertyInput): void {
	if (!input.clientId) {
		throw new Error('Client ID is required.');
	}

	if (!input.propertyId) {
		throw new Error('Property ID is required.');
	}

	if (!input.roleCode?.trim()) {
		throw new Error('Property role is required.');
	}
}
