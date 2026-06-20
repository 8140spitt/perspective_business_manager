import type {
	PROJECT_ASSIGNMENT_ROLE_CODES,
	PROJECT_CONTACT_ROLE_CODES,
	PROJECT_PARTY_ROLE_CODES,
	PROJECT_STATE_CODES
} from './projects.constants';

export type ProjectStateCode = (typeof PROJECT_STATE_CODES)[number];
export type ProjectPartyRoleCode = (typeof PROJECT_PARTY_ROLE_CODES)[number];
export type ProjectContactRoleCode = (typeof PROJECT_CONTACT_ROLE_CODES)[number];
export type ProjectAssignmentRoleCode = (typeof PROJECT_ASSIGNMENT_ROLE_CODES)[number];

export type ProjectRecord = {
	projectId: number;
	projectReference: string;
	projectName: string;
	projectTypeCode: string | null;
	projectStateCode: string;
	primaryClientBusinessPartnerId: number | null;
	enquiryDate: string | null;
	expectedStartDate: string | null;
	expectedCompletionDate: string | null;
	actualStartDate: string | null;
	actualCompletionDate: string | null;
	description: string | null;
	notes: string | null;
	createdAt: string | null;
	updatedAt: string | null;
};

export type ProjectCommercialSummary = {
	projectId: number;
	projectReference: string;
	projectName: string;
	projectStateCode: string;
	clientBusinessPartnerId: number | null;
	clientName: string | null;
	serviceCount: number;
	locationCount: number;
	quotedTotal: number;
	salesInvoiceTotal: number;
	supplierInvoiceTotal: number;
	grossMarginBeforeTax: number;
	createdAt: string | null;
	updatedAt: string | null;
};

export type ProjectResponsibility = {
	projectId: number;
	projectReference: string;
	projectName: string;
	projectRoleCode: string;
	employeeNumber: string | null;
	personEntityId: number | null;
	firstName: string | null;
	lastName: string | null;
	positionTitle: string | null;
	unitName: string | null;
	functionName: string | null;
	allocationPercent: number | null;
	isPrimary: boolean;
	isActive: boolean;
};

export type ProjectExternalContact = {
	projectId: number;
	projectReference: string;
	projectName: string;
	businessPartnerId: number;
	partnerName: string;
	partnerProjectRole: string | null;
	personEntityId: number;
	firstName: string;
	lastName: string;
	jobTitle: string | null;
	department: string | null;
	organisationRole: string | null;
	projectContactRoleCode: string;
	isPrimary: boolean;
	isActive: boolean;
};

export type ProjectScopeSummary = {
	projectId: number;
	projectReference: string;
	projectName: string;
	projectLocationId: number | null;
	locationName: string | null;
	addressLine1: string | null;
	townCity: string | null;
	postcode: string | null;
	projectServiceId: number | null;
	serviceCode: string | null;
	serviceName: string | null;
	serviceDescription: string | null;
	quantity: number | null;
	unitCode: string | null;
	projectServiceStatus: string | null;
};

export type ProjectDashboard = {
	summary: ProjectCommercialSummary | null;
	responsibilities: ProjectResponsibility[];
	externalContacts: ProjectExternalContact[];
	scope: ProjectScopeSummary[];
};

export type CreateProjectInput = {
	projectReference?: string;
	projectName: string;
	projectTypeCode?: string | null;
	projectStateCode?: string;
	primaryClientBusinessPartnerId?: number | null;
	enquiryDate?: string | null;
	description?: string | null;
	notes?: string | null;
};

export type TransitionProjectStateInput = {
	projectId: number;
	toStateCode: string;
	changedByPersonId?: number | null;
	reason?: string | null;
};
