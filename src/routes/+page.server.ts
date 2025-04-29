import { type ProductType, getCategories } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories: ProductType[] = await getCategories();
	return {
		categories: categories
	};
};
