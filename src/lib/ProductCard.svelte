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
	id="card"
	title={titleText}
>
	<img src={imageUrl} alt="" />
	<div id="info">
		<h2>{titleText}</h2>
		<p>Price: {price}$</p>
	</div>
</div>

<style>
	#card {
		border: 2px solid black;
		border-radius: 8px;
		width: 216px;
		height: fit-content;
		display: flex;
		flex-direction: column;
	}
	#card:hover {
		background-color: rgb(185, 185, 185);
		cursor: pointer;
	}
	img {
		width: 200px;
		padding: 8px;
	}
	#info {
		background-color: rgb(75, 75, 75);
		border-radius: 0px 0px 8px 8px;
		padding: 8px;
	}
	h2 {
		margin-top: 8px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
