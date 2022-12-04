<script lang="ts" type="module">
	import { onMount } from "svelte";
	import { init } from "./main";

	onMount(() => {
		init();
	});
</script>

<div id="css" />
<div id="webgl" />

<style>
	#webgl {
		pointer-events: none;
	}
	body {
		background-color: #ffffff;
		margin: 0;
		overflow: hidden;
	}

	* {
		outline: none;
	}

	#css,
	#webgl {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
