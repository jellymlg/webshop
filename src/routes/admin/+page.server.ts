import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.isAdmin != 1) return redirect(303, '/');
		return {
			username: event.locals.user.username,
			email: event.locals.user.email
		};
	} else {
		redirect(303, 'login');
	}
};
