<script lang="ts">
	import type { ProductType } from '$lib/db';

	export let data: {
		categories: ProductType[];
	};
</script>

<div>
	<h1>Test Webshop</h1>
	<ul>
		{#each data.categories as category (category.id)}
			<li><a href={'/category/' + category.name}>{category.long_name}</a></li>
		{/each}
	</ul>
</div>

<style>
	div {
		display: flex;
		flex: 1;
		justify-content: center;
		flex-direction: column;
	}
	h1 {
		text-align: center;
		font-size: xx-large;
	}
	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-wrap: wrap;
		align-content: center;
	}
	li {
		padding: 8px;
		text-align: center;
		font-size: large;
	}
</style>
