<script lang="ts">
	import type { Product } from '$lib/db';
	import ProductInfo from '$lib/ProductInfo.svelte';

	export let data: {
		imageUrl: string;
		product: Product;
	};
</script>

<img src={data.imageUrl} alt="" />
<p>{data.product.name}</p>
<p>{data.product.price}</p>
<p>{data.product.vendor}</p>
<ProductInfo infos={new Map(Object.entries(JSON.parse(data.product.data)))} />
