import { getUserBySID } from '$lib/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getUserBySID(event.cookies.get('sid'));
	return await resolve(event);
};
