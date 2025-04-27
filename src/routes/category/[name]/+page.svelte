<script lang="ts">
	import type { Product } from '$lib/db';
	import ProductCard from '$lib/ProductCard.svelte';
	import ProductFilter from '$lib/ProductFilter.svelte';

	export let data: {
		title: string;
		products: Product[];
		images: string[];
	};

	let allProps: Map<string, string[]> = new Map();

	data.products.forEach((prod) => {
		allProps.get('vendor')?.push(prod.vendor);
	});
</script>

<h1>{data.title}</h1>

<ProductFilter properties={allProps} />

<div>
	{#each data.products as product, i (product.id)}
		<ProductCard
			titleText={product.name}
			imageUrl={data.images[i]}
			price={product.price}
			productUrl={'/product/' + product.id}
		/>
	{/each}
</div>
