<script lang="ts">
	let {
		infos
	}: {
		infos: Map<string, string>;
	} = $props();
</script>

<ul>
	{#each infos as info (info)}
		<li>{info[0]}: {info[1]}</li>
	{/each}
</ul>
