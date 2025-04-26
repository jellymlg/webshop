<script lang="ts">
	export let data: { username: string; email: string };
</script>

{#if data}
	<h1>Username: {data.username}</h1>
	<p>Email: {data.email}</p>
{/if}
