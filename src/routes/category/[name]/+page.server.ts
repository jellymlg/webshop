import {
	getProductsInCategory,
	getProductTypeFromName,
	type Product,
	type ProductType
} from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getImageURLFromId } from '$lib/image';

export const load: PageServerLoad = async ({ params }) => {
	const categoryName: string = params.name;
	const category: ProductType | undefined = (await getProductTypeFromName(
		categoryName.toUpperCase()
	))!;
	if (category) {
		const prods: Product[] = await getProductsInCategory(category.id);
		const images: Map<number, string> = new Map(prods.map((p) => [p.id, getImageURLFromId(p.id)]));
		return {
			title: category.long_name,
			products: prods,
			images: images
		};
	} else {
		return redirect(303, '/');
	}
};
