import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { createCategory, createProduct, getCategories } from '$lib/db';
import { uploadImage } from '$lib/image';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.isAdmin != 1) return redirect(303, '/');
		return {
			productTypes: await getCategories()
		};
	} else {
		redirect(303, 'login');
	}
};

export const actions = {
	newCategory: async (event) => {
		if (!event.locals.user) return redirect(303, '/');
		const form: FormData = await event.request.formData();
		const name: string = form.get('name') as string;
		const long_name: string = form.get('long_name') as string;
		await createCategory(name, long_name);
	},
	newProduct: async (event) => {
		if (!event.locals.user) return redirect(303, '/');
		const form: FormData = await event.request.formData();
		const type_id: string = form.get('type_id') as string;
		const name: string = form.get('name') as string;
		const price: string = form.get('price') as string;
		const vendor: string = form.get('vendor') as string;
		const imageBlob: string = form.get('imageBlob') as string;
		const extra: string = form.get('extra') as string;
		const data = JSON.stringify(
			extra
				.split('\n')
				.filter((line) => line.split(';').length == 2)
				.reduce(
					(acc: Record<string, string>, line) => {
						const [key, value] = line.split(';');
						acc[key.trim()] = value.trim();
						return acc;
					},
					{} as Record<string, string>
				)
		);
		const productId: number = await createProduct(+type_id, name, +price, vendor, data);
		await uploadImage(imageBlob, productId);
	}
} satisfies Actions;
