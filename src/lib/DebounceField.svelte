<script lang="ts">
	let {
		text = $bindable()
	}: {
		text: string;
	} = $props();

	let _text = $state(text);

	let timeout: NodeJS.Timeout;

	function input() {
		clearTimeout(timeout);
		timeout = setTimeout(() => (text = _text), 400);
	}
</script>

<input type="text" bind:value={_text} oninput={() => input()} />
