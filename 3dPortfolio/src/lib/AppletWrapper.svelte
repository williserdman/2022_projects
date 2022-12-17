<script lang="ts">
	export let type: String; // prop caught by svelte... ignore squiglies, vscode doesn't know what's up
	export let width: number = 60;
	export let height: number = 40;
	export let minimized: boolean = false;
	export let left = 100;
	export let top = 100;
	console.log(width, height, minimized);
	let moving = false;

	function mouseDownTop() {
		console.log("click 1");
		moving = true;
	}
	function mouseUpTop() {
		moving = false;
	}
	function mouseMoveTop(e: object) {
		if (moving) {
			//@ts-ignore
			left += e.movementX;
			//@ts-ignore
			top += e.movementY;
		}
	}
</script>

<!-- top nav area of applet 

if things from svelte

bottom stuff from applet (if needed idk yet) -->
<html lang="html" style="left: {left}px; top: {top}px;">
	<div
		class="top"
		on:mousedown={mouseDownTop}
		on:mouseup={mouseUpTop}
		on:mousemove={mouseMoveTop}
		on:mouseleave={mouseUpTop}
	/>
	<main bind:clientWidth={width} bind:clientHeight={height} hidden={minimized} />
</html>

<style>
	.top {
		height: 50px;
		width: 100%;
		background-color: white;
	}
	html {
		position: relative;
		width: 400px;
		height: 400px;
		background-color: rgba(0, 0, 100, 0.5);
	}
</style>
