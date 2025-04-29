<script lang="ts">
	import type { Product } from '$lib/db';
	import ProductInfo from '$lib/ProductInfo.svelte';

	export let data: {
		imageUrl: string;
		product: Product;
		isInBasket: boolean;
	};
</script>

<div id="container">
	<img src={data.imageUrl} alt="" />
	<div id="info">
		<h1>{data.product.name}</h1>
		<h3>Price: {data.product.price}$</h3>
		<p>Vendor: {data.product.vendor}</p>
		<h2>Other properties:</h2>
		<ProductInfo infos={new Map(Object.entries(JSON.parse(data.product.data)))} />
		<form method="POST">
			<input type="hidden" name="productId" value={data.product.id} />
			<button disabled={data.isInBasket}
				>{data.isInBasket ? 'Already in basket' : 'Add To basket'}</button
			>
		</form>
	</div>
</div>

<style>
	#container {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
	}
	#info {
		margin-left: 10%;
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	img {
		width: 400px;
		height: 400px;
		border: 2px solid white;
	}
	button {
		padding: 8px;
		cursor: pointer;
		font-size: 120%;
	}
	h1 {
		font-size: 250%;
	}
	form {
		text-align: center;
	}
</style>
