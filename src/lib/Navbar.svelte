<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let { isAdmin }: { isAdmin: boolean } = $props();
</script>

<nav>
	<a href="/">Főoldal</a>
	{#if isAdmin}
		<a href="/admin">Admin panel</a>
	{:else}
		<a href="/settings">Felhasználói fiók</a>
	{/if}
	<a href="/register">Regisztáció</a>
	<a href="/login">Bejelentkezés</a>
	<a href="/logout" onclick={() => invalidateAll()}>Kijelentkezés</a>
</nav>
