import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { removeSession } from '$lib/db';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		removeSession(event.cookies.get('sid')!);
		event.cookies.delete('sid', { path: '/' });
		event.locals.user = undefined;
	}
	redirect(303, '/');
};
