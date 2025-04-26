<script lang="ts">
	let {
		titleText,
		imageUrl,
		price,
		productUrl
	}: {
		titleText: string;
		imageUrl: string;
		price: number;
		productUrl: string;
	} = $props();
</script>

<div
	onclick={() => (window.location.href = productUrl)}
	onkeypress={() => console.log('')}
	role="button"
	tabindex="0"
>
	<img src={imageUrl} alt="" />
	<p>{titleText}</p>
	<p>{price} Ft</p>
</div>
