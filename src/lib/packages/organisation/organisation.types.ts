export type BusinessProfileRecord = {
	businessPartnerId: number;
	businessEntityId: number | null;
	partnerReference: string | null;
	partnerName: string;
	partnerStatusCode: string;
	legalName: string | null;
	tradingName: string | null;
	companyNumber: string | null;
	vatNumber: string | null;
	taxReference: string | null;
	industryCode: string | null;
	website: string | null;
	notes: string | null;
	createdAt: string | null;
	updatedAt: string | null;
};

export type BusinessFunctionRecord = {
	businessFunctionId: number;
	parentBusinessFunctionId: number | null;
	parentFunctionName: string | null;
	functionCode: string;
	functionName: string;
	functionLevel: number;
	description: string | null;
	isActive: boolean;
	createdAt: string | null;
	updatedAt: string | null;
};

export type OrganisationUnitRecord = {
	organisationUnitId: number;
	parentOrganisationUnitId: number | null;
	parentUnitName: string | null;
	businessFunctionId: number | null;
	functionName: string | null;
	unitCode: string;
	unitName: string;
	unitTypeCode: string | null;
	isActive: boolean;
	createdAt: string | null;
	updatedAt: string | null;
};

export type PositionRecord = {
	positionId: number;
	organisationUnitId: number;
	unitName: string | null;
	businessFunctionId: number | null;
	functionName: string | null;
	reportsToPositionId: number | null;
	reportsToPositionTitle: string | null;
	positionCode: string | null;
	positionTitle: string;
	positionTypeCode: string | null;
	isManager: boolean;
	isActive: boolean;
	createdAt: string | null;
	updatedAt: string | null;
};

export type EmployeeRecord = {
	employeeId: number;
	personEntityId: number;
	employeeNumber: string;
	firstName: string;
	lastName: string;
	knownAs: string | null;
	employmentStatusCode: string;
	employmentTypeCode: string | null;
	startDate: string;
	endDate: string | null;
	primaryOrganisationUnitId: number | null;
	primaryUnitName: string | null;
	primaryPositionId: number | null;
	primaryPositionTitle: string | null;
	createdAt: string | null;
	updatedAt: string | null;
};

export type EmployeePositionRecord = {
	employeePositionId: number;
	employeeId: number;
	employeeNumber: string;
	personEntityId: number;
	firstName: string;
	lastName: string;
	positionId: number;
	positionTitle: string;
	organisationUnitId: number;
	unitName: string;
	businessFunctionId: number | null;
	functionName: string | null;
	startDate: string;
	endDate: string | null;
	isPrimary: boolean;
	createdAt: string | null;
	updatedAt: string | null;
};

export type OrganisationDashboard = {
	businessProfile: BusinessProfileRecord | null;
	businessFunctions: BusinessFunctionRecord[];
	organisationUnits: OrganisationUnitRecord[];
	positions: PositionRecord[];
	employees: EmployeeRecord[];
	employeePositions: EmployeePositionRecord[];
};
