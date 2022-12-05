<script>
	// @ts-ignore
	import OSNavbar from "$lib/OSNavbar.svelte";
	// @ts-ignore
	import MainOS from "$lib/MainOS.svelte";
</script>

<html lang="html">
	<body>
		<div class="os-navbar">
			<OSNavbar />
		</div>
		<div class="main-os">
			<MainOS />
		</div>
	</body>
</html>

<style>
	* {
		outline: none;
		overflow: hidden;
	}
	html {
		background-color: aquamarine;
		padding: 0;
		margin: 0;
		border: 0;
	}
	body {
		margin: 0;
	}
</style>
