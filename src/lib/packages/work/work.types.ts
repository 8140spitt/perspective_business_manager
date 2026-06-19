import type {
	WORK_CONTAINER_STATUS_CODES,
	WORK_CONTAINER_TYPE_CODES,
	WORK_INSTRUCTION_STATUS_CODES,
	WORK_SUPPLY_MODE_CODES
} from './work.constants';

export type WorkContainerTypeCode = (typeof WORK_CONTAINER_TYPE_CODES)[number];
export type WorkContainerStatusCode = (typeof WORK_CONTAINER_STATUS_CODES)[number];
export type WorkInstructionStatusCode = (typeof WORK_INSTRUCTION_STATUS_CODES)[number];
export type WorkSupplyModeCode = (typeof WORK_SUPPLY_MODE_CODES)[number];

export interface WorkContainerRecord {
	id: number;
	reference: string;
	typeCode: WorkContainerTypeCode | string;
	clientAccountId: number | null;
	partyId: number | null;
	sourceObjectTypeCode: string | null;
	sourceObjectId: number | null;
	statusCode: WorkContainerStatusCode | string;
	title: string;
	summary: string | null;
	plannedStartDate: string | null;
	plannedEndDate: string | null;
	actualStartDate: string | null;
	actualEndDate: string | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface CreateWorkContainerInput {
	reference?: string;
	typeCode: WorkContainerTypeCode | string;
	clientAccountId?: number | null;
	partyId?: number | null;
	sourceObjectTypeCode?: string | null;
	sourceObjectId?: number | null;
	title: string;
	summary?: string | null;
	plannedStartDate?: string | null;
	plannedEndDate?: string | null;
}

export interface WorkServiceRecord {
	id: number;
	serviceCode: string;
	serviceName: string;
	description: string | null;
	isActive: boolean;
	createdAt: string;
	updatedAt: string | null;
}

export interface CreateWorkServiceInput {
	serviceCode: string;
	serviceName: string;
	description?: string | null;
}

export interface WorkInstructionRecord {
	id: number;
	reference: string;
	workContainerId: number;
	instructionTypeCode: string;
	serviceCode: string | null;
	supplierPartyId: number | null;
	assignedPartyId: number | null;
	statusCode: WorkInstructionStatusCode | string;
	title: string;
	instructionText: string | null;
	dueDate: string | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface CreateWorkInstructionInput {
	reference?: string;
	workContainerId: number;
	instructionTypeCode?: string;
	serviceCode?: string | null;
	supplierPartyId?: number | null;
	assignedPartyId?: number | null;
	title: string;
	instructionText?: string | null;
	dueDate?: string | null;
}

export interface TransitionWorkStatusInput {
	objectTypeCode: 'work_container' | 'work_instruction';
	objectId: number;
	toStatusCode: string;
	fromStatusCode?: string | null;
	reason?: string | null;
	changedBy?: number | null;
}
