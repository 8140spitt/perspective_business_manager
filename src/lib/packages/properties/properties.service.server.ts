import {
	createProperty,
	getPropertyById,
	linkClientProperty,
	listClientProperties,
	listProperties,
	listPropertiesForSelection
} from './properties.repository.server';
import type {
	CreatePropertyInput,
	LinkClientPropertyInput,
	Property,
	PropertyListItem
} from './properties.types';
import { validateCreateProperty, validateLinkClientProperty } from './properties.validators';

export async function getProperties(): Promise<PropertyListItem[]> {
	return listProperties();
}

export async function getProperty(propertyId: number): Promise<Property> {
	const property = await getPropertyById(propertyId);

	if (!property) {
		throw new Error('Property not found.');
	}

	return property;
}

export async function createPropertyRecord(input: CreatePropertyInput): Promise<number> {
	validateCreateProperty(input);
	return createProperty(input);
}

export async function getClientProperties(clientId: number) {
	return listClientProperties(clientId);
}

export async function getPropertiesForSelection(): Promise<PropertyListItem[]> {
	return listPropertiesForSelection();
}

export async function linkClientPropertyRecord(input: LinkClientPropertyInput): Promise<number> {
	validateLinkClientProperty(input);
	return linkClientProperty(input);
}
