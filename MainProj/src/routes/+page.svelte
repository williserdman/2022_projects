<script lang="ts">
	import { onMount } from "svelte";
	import { createScene } from "./main";

	let bg: HTMLCanvasElement;
	let div: HTMLDivElement;

	onMount(() => {
		createScene(bg, div);
	});
</script>

<canvas bind:this={bg} />

<div bind:this={div}>
	<!-- svelte-ignore a11y-missing-attribute -->
	<iframe src="https://threejs.org" frameborder="0" />
</div>

<style>
	canvas {
		position: fixed;
		left: 0;
		top: 0;
	}
</style>
