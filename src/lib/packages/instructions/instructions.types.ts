export interface Instruction {
	instructionId: number;
	instructionReference: string;
	clientAccountId: number;
	instructionTypeCode: string;
	serviceLineCode: string;
	statusCode: string;
	priorityCode: string;
	title: string;
	summary: string | null;
	receivedAt: string | null;
	acceptedAt: string | null;
	targetIssueDate: string | null;
	closedAt: string | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface CreateInstructionInput {
	instructionReference?: string | null;
	clientAccountId: number;
	instructionTypeCode: string;
	serviceLineCode: string;
	priorityCode?: string;
	title: string;
	summary?: string | null;
	receivedAt?: string | null;
	targetIssueDate?: string | null;
}
