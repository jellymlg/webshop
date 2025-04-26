import { checkLogin, type UserSession } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		redirect(303, '/');
	}
	return {};
};

export const actions = {
	default: async (event) => {
		const form: FormData = await event.request.formData();
		const username: string = form.get('username') as string;
		const password: string = form.get('password') as string;
		const userSession: UserSession | undefined = await checkLogin(username, password);
		if (userSession) {
			event.cookies.set('sid', userSession.session.id, { path: '/' });
			return redirect(303, '/');
		} else {
			return redirect(303, 'login');
		}
	}
} satisfies Actions;
