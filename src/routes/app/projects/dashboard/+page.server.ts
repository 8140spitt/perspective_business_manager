import { listProjects } from '$lib/packages/projects/projects.service.server';

export async function load() {
	return {
		projects: await listProjects()
	};
}
