<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div>
	<Navbar isAdmin={data.isAdmin} />
	<slot />
	<Footer />
</div>
