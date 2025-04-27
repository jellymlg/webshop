<form method="POST">
	<h1>Login page</h1>
	<input name="username" type="text" placeholder="Username" />
	<input name="password" type="password" placeholder="Password" />
	<button>Log in</button>
</form>

<style>
	h1 {
		font-size: 200%;
		text-align: center;
	}
	form {
		font-size: 120%;
		display: flex;
		align-items: center;
		flex-flow: column;
		flex: 1;
		justify-content: center;
	}
	form > * {
		margin: 16px;
	}
	button {
		padding: 8px;
		cursor: pointer;
		font-size: 120%;
	}
	input {
		padding: 8px;
		font-size: 75%;
	}
</style>
