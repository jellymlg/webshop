<script lang="ts">
	import type { Product } from '$lib/db';
	import ProductCard from '$lib/ProductCard.svelte';
	import ProductFilter from '$lib/ProductFilter.svelte';

	export let data: {
		title: string;
		products: Product[];
		images: Map<number, string>;
	};

	let filteredProducts: Product[] = data.products;

	function filterProducts(str: string) {
		str = str.toLowerCase();
		filteredProducts = data.products.filter((p) => p.name.toLowerCase().includes(str));
	}

	let allProps: Map<string, string[]> = new Map();
	filteredProducts.forEach((prod) => {
		allProps.set('Vendor', (allProps.get('Vendor') ?? []).concat(prod.vendor));
		Object.entries(JSON.parse(prod.data)).forEach((prop) =>
			allProps.set(prop[0], (allProps.get(prop[0]) ?? []).concat(prop[1] as string))
		);
	});
</script>

<div id="container">
	<div id="sidebar">
		<h1>{data.title}</h1>
		<ProductFilter properties={allProps} onSearch={filterProducts} />
	</div>
	{#each filteredProducts as product (product.id)}
		<ProductCard
			titleText={product.name}
			imageUrl={data.images.get(product.id)!}
			price={product.price}
			productUrl={'/product/' + product.id}
		/>
	{/each}
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
		flex: 1;
	}
	#sidebar {
		display: flex;
		flex-direction: column;
		margin-right: 10%;
	}
</style>
