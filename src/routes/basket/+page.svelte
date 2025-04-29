<script lang="ts">
	import type { Product } from '$lib/db';
	import ProductCard from '$lib/ProductCard.svelte';

	export let data: {
		products: Product[];
		images: Map<number, string>;
	};

	let totalPrice = data.products.map((p) => p.price).reduce((acc, v) => acc + v, 0);
</script>

<div id="container">
	{#each data.products as product (product.id)}
		<form method="POST">
			<button class="remove">Remove</button>
			<input type="hidden" name="productId" value={product.id} />
			<ProductCard
				titleText={product.name}
				imageUrl={data.images.get(product.id)!}
				price={product.price}
				productUrl={'/product/' + product.id}
			/>
		</form>
	{/each}
	<div id="sidebar">
		<h1>Total</h1>
		<h2>Products: {data.products.length}</h2>
		<h2>Price: {totalPrice}$</h2>
		<button onclick={() => alert('Payment process placeholder')}>Checkout</button>
	</div>
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
		flex: 1;
		justify-content: flex-end;
	}
	#sidebar {
		display: flex;
		flex-direction: column;
		margin-left: 10%;
	}
	h1 {
		font-size: 250%;
	}
	button {
		padding: 8px;
		cursor: pointer;
		font-size: 120%;
	}
	form {
		position: relative;
	}
	.remove {
		position: absolute;
		right: 8px;
		top: 8px;
	}
</style>
