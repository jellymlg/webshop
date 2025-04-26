import { createUser } from '$lib/db';
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
		const email: string = form.get('email') as string;
		const password: string = form.get('password') as string;
		await createUser(username, password, email);
		redirect(303, 'login');
	}
} satisfies Actions;
