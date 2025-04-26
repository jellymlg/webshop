import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../login/$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return {
			username: event.locals.user.username,
			email: event.locals.user.email
		};
	} else {
		redirect(303, 'login');
	}
};
