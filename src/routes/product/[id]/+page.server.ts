import { addToBasket, getProductById, type Product } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getImageURLFromId } from '$lib/image';

export const load: PageServerLoad = async ({ params }) => {
	const productId: string = params.id;
	const product: Product = (await getProductById(productId))!;
	return {
		imageUrl: getImageURLFromId(product.id),
		product: product
	};
};

export const actions = {
	default: async (event) => {
		if (event.locals.user) {
			const form: FormData = await event.request.formData();
			const productId: string = form.get('productId') as string;
			await addToBasket(event.locals.user.id, productId);
			return {};
		} else {
			return redirect(303, 'login');
		}
	}
} satisfies Actions;
