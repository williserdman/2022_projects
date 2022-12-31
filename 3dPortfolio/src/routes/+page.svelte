<script lang="ts" type="module">
	import { onMount } from "svelte";
	import { init } from "./main";

	onMount(() => {
		init();
	});
</script>

<html lang="html">
	<div class="trigger" />
	<div id="css" />
	<div id="webgl" />
</html>

<style>
	.trigger {
		position: absolute;
		height: 98%;
		top: 1%;
	}
	#webgl {
		pointer-events: none;
	}

	* {
		outline: none;
	}

	#css,
	#webgl {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
