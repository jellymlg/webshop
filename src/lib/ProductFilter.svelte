<script lang="ts">
	import DebounceField from './DebounceField.svelte';

	let {
		properties
	}: {
		properties: Map<string, string[]>;
	} = $props();

	let searchWord: string = $state('');

	$effect(() => {
		console.log(searchWord);
	});
</script>

<div>
	<DebounceField bind:text={searchWord} />
	{#each properties as property (property[0])}
		<p>{property[0]}</p>
		<ul>
			{#each property[1] as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	{/each}
</div>
