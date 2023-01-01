<script lang="ts" type="module">
	import { onMount } from "svelte";
	import { init } from "./main";
	import "bulma";

	onMount(() => {
		init();
	});
</script>

<html lang="html" style="height: 800%;">
	<div class="columns" />
	<p
		class="column box is-one-fifth m-3 has-text-centered"
		style="color: black; z-index: 99; position: absolute;"
	>
		Scroll to begin...
	</p>
	<div style="height: 800%;">
		<div class="trigger" />
		<div id="css" />
		<div id="webgl" />
	</div>
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
		z-index: -1;
	}
</style>
