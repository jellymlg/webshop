import { addToBasket, getBasketForUser, getProductById, type Product } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getImageURLFromId } from '$lib/image';

export const load: PageServerLoad = async (event) => {
	const productId: string = event.params.id;
	const product: Product = (await getProductById(productId))!;
	const basket: Product[] = event.locals.user ? await getBasketForUser(event.locals.user.id) : [];
	return {
		imageUrl: getImageURLFromId(product.id),
		product: product,
		isInBasket: !!basket.find((p) => p.id == +productId)
	};
};

export const actions = {
	default: async (event) => {
		if (event.locals.user) {
			const form: FormData = await event.request.formData();
			const productId: string = form.get('productId') as string;
			const basket: Product[] = await getBasketForUser(event.locals.user.id);
			if (!basket.find((p) => p.id == +productId)) {
				await addToBasket(event.locals.user.id, productId);
			}
			return {};
		} else {
			return redirect(303, 'login');
		}
	}
} satisfies Actions;
