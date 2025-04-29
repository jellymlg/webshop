import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getBasketForUser, removeFromBasket, type Product } from '$lib/db';
import { getImageURLFromId } from '$lib/image';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		const prods: Product[] = await getBasketForUser(event.locals.user.id);
		const images: Map<number, string> = new Map(prods.map((p) => [p.id, getImageURLFromId(p.id)]));
		return {
			products: prods,
			images: images
		};
	} else {
		redirect(303, 'login');
	}
};

export const actions = {
	default: async (event) => {
		if (event.locals.user) {
			const form: FormData = await event.request.formData();
			const productId: string = form.get('productId') as string;
			await removeFromBasket(event.locals.user.id, productId);
			return {};
		} else {
			return redirect(303, 'login');
		}
	}
} satisfies Actions;
