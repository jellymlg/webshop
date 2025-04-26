import {
	getProductsInCategory,
	getProductTypeFromName,
	type Product,
	type ProductType
} from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const categoryName: string = params.name;
	const category: ProductType | undefined = (await getProductTypeFromName(
		categoryName.toUpperCase()
	))!;
	if (category) {
		const prods: Product[] = await getProductsInCategory(category.id);
		return {
			title: category.long_name,
			products: prods
		};
	} else {
		return redirect(303, '/');
	}
};
