<script>
	function aboutMe() {}
	function gameSelection() {}
	function infoButton() {}
</script>

<svelte:head
	><script
		src="https://kit.fontawesome.com/a2e98ca178.js"
		crossorigin="anonymous"
	></script></svelte:head
>

<html lang="html">
	<div class="holder">
		<div class="main">
			<div class="icons">
				<i on:click={aboutMe} class="fa fa-regular fa-address-card fa-2xl" />
				<i on:click={gameSelection} class="fa fa-solid fa-gamepad fa-2xl" />
				<i on:click={infoButton} class="fa fa-solid fa-circle-info fa-2xl" />
			</div>
		</div>
	</div>
</html>

<style>
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		25% {
			opacity: 0.25;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}
	html {
		opacity: 0;
	}
	html:hover {
		animation-name: fadeIn;
		animation-duration: 1s;
		display: flex;
		justify-content: center;
	}
	.holder {
		height: 3rem;
		width: 50%;
		display: block;
		position: absolute;
		bottom: 0;
		background-color: gray;
		border-radius: 15px 15px 0px 0px;
	}
	.main {
		display: flex;
		justify-content: center;
		height: 100%;
	}
	.icons {
		display: block;
		margin: auto;
		margin-left: 20%;
		margin-right: 20%;
	}
	i {
		margin-left: 0.25rem;
		margin-right: 0.25rem;
	}
</style>
