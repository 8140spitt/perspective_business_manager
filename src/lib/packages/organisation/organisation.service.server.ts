import {
	getOrganisationDashboard,
	listBusinessFunctions,
	listEmployeePositions,
	listEmployees,
	listOrganisationUnits,
	listPositions
} from './organisation.repository.server';

export async function getOrganisationWorkspace() {
	return getOrganisationDashboard();
}

export async function listFunctions() {
	return listBusinessFunctions();
}

export async function listUnits() {
	return listOrganisationUnits();
}

export async function listOrgPositions() {
	return listPositions();
}

export async function listOrgEmployees() {
	return listEmployees();
}

export async function listOrgEmployeePositions() {
	return listEmployeePositions();
}

export const organisationService = {
	getOrganisationWorkspace,
	listFunctions,
	listUnits,
	listOrgPositions,
	listOrgEmployees,
	listOrgEmployeePositions
};
