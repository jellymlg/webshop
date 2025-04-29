<script lang="ts">
	import DebounceField from './DebounceField.svelte';

	let {
		properties,
		onSearch
	}: {
		properties: Map<string, string[]>;
		onSearch: (searchTerm: string) => void;
	} = $props();

	let _searchWord: string = $state('');

	$effect(() => {
		onSearch(_searchWord);
	});
</script>

<div>
	<DebounceField bind:text={_searchWord} placeholder="Search" />
	{#each properties as property (property)}
		<p>{property[0]}</p>
		<ul>
			{#each [...new Set(property[1])] as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	{/each}
</div>

<style>
	ul {
		list-style-type: none;
	}
</style>
