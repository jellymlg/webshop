import { addToBasket, getProductById, type Product } from '$lib/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const productId: string = params.id;
	const product: Product = (await getProductById(productId))!;
	return {
		imageUrl: product.image,
		titleText: product.name,
		infos: new Map<string, string>(Object.entries(JSON.parse(product.data)))
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
