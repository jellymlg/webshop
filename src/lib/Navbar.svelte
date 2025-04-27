<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let { isAdmin }: { isAdmin: boolean } = $props();
</script>

<nav>
	<a href="/">Home</a>
	{#if isAdmin}
		<a href="/admin">Admin panel</a>
	{:else}
		<a href="/settings">Account</a>
	{/if}
	<a href="/register">Register</a>
	<a href="/login">Login</a>
	<a href="/logout" onclick={() => invalidateAll()}>Logout</a>
</nav>

<style>
	nav {
		display: flex;
		background-color: grey;
		margin: 16px;
		padding: 8px;
		justify-content: space-evenly;
		border-radius: 8px;
	}
	nav > a {
		font-size: 100%;
		padding: 10px;
		background-color: rgb(40, 40, 40);
		border-radius: 4px;
		text-decoration: none;
		color: white;
		transition: 0.7s;
	}
	nav > a:hover {
		background-color: rgb(185, 185, 185);
		transition: 0.7s;
	}
</style>
