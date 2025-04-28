<script lang="ts">
	let {
		text = $bindable(),
		placeholder
	}: {
		text: string;
		placeholder: string;
	} = $props();

	let _text = $state(text);

	let timeout: NodeJS.Timeout;

	function input() {
		clearTimeout(timeout);
		timeout = setTimeout(() => (text = _text), 400);
	}
</script>

<input type="text" {placeholder} bind:value={_text} oninput={() => input()} />
