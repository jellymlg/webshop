<script lang="ts">
	import ProductInfo from '$lib/ProductInfo.svelte';

	export let data: {
		imageUrl: string;
		titleText: string;
		infos: Map<string, string>;
	};
</script>

<img src={data.imageUrl} alt="" />
<p>{data.titleText}</p>
<ProductInfo infos={data.infos} />
