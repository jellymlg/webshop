<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div id="container">
	<Navbar isAdmin={data.isAdmin} />
	<section>
		<slot />
	</section>
	<Footer />
</div>

<style>
	#container {
		display: flex;
		flex-flow: column;
		flex: 1;
	}
	section {
		display: flex;
		width: 75%;
		flex: 1;
		margin: auto;
	}
</style>
