import { error } from '@sveltejs/kit';
import { getDashboard } from '$lib/packages/projects/projects.service.server';

export async function load({ params }) {
	const projectId = Number(params.projectId);

	if (!Number.isFinite(projectId) || projectId <= 0) {
		throw error(400, 'A valid project id is required.');
	}

	const dashboard = await getDashboard(projectId);

	if (!dashboard.summary) {
		throw error(404, 'Project not found.');
	}

	return {
		dashboard
	};
}
