<script lang="ts">
	import type { ProductType } from '$lib/db';

	export let data: {
		productTypes: ProductType[];
	};

	let fileInput: HTMLInputElement;
	let img: string = 'favicon.png';

	function onFileSelected() {
		let file = fileInput.files?.item(0) as File;
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (x) => (img = x.target!.result as string);
	}
</script>

<div>
	<h1>Admin panel</h1>
	<form method="POST" action="?/newCategory" id="category">
		<h1>New category</h1>
		<input type="text" name="name" placeholder="Short name" />
		<input type="text" name="long_name" placeholder="Long name" />
		<button>Create category</button>
	</form>
	<form method="POST" action="?/newProduct" id="product">
		<h1>New product</h1>
		<select name="type_id">
			{#each data.productTypes as prodType (prodType)}
				<option value={prodType.id}>{prodType.long_name}</option>
			{/each}
		</select>
		<input type="text" name="name" placeholder="Name" />
		<input type="number" min="1" value="1" name="price" placeholder="Price" />
		<input type="text" name="vendor" placeholder="Vendor" />
		<input
			type="file"
			accept=".jpg, .jpeg, .png"
			bind:this={fileInput}
			on:change={onFileSelected}
		/>
		<input type="text" name="imageBlob" style="display: none;" value={img} />
		<img src={img} alt="preview" />
		<textarea
			name="extra"
			placeholder="Key1;Value1
Key2;Value2
Key3;Value3"
		></textarea>
		<button>Create product</button>
	</form>
</div>

<style>
	h1 {
		text-align: center;
	}
	div {
		display: flex;
		flex-flow: column;
		flex: 1;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	form > * {
		margin: 16px;
	}
	input,
	select,
	textarea {
		padding: 8px;
		font-size: 90%;
		width: 25%;
	}
	button {
		padding: 8px;
		cursor: pointer;
		font-size: 120%;
	}
	textarea {
		resize: vertical;
	}
	img {
		width: 200px;
		border: 2px solid white;
	}
</style>
