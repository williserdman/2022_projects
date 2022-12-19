<script lang="ts">
	import { openApps } from "./modules/stores";
	export const type: string = ""; // prop caught by svelte... ignore squiglies, vscode doesn't know what's up
	export let width: number = 500;
	export let height: number = 500;
	export let minimized: boolean = false;
	export let focus: number;
	export let left = 100;
	export let top = 100;
	let moving = false;

	function mouseDownTop(e: object) {
		console.log("click 1");
		moving = true;
		//@ts-ignore
		mainClick({ ...e, target: e.target.parentElement }); // propogation stopped in here
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
	function mainClick(e: object) {
		// local var focus for corresponding elment, and all others in $openApps
		let lMax = -1;
		$openApps.forEach((i) => {
			if (i.focus > lMax) lMax = i.focus;
		});

		console.log($openApps);
		focus = lMax + 1;
		console.log($openApps);
		//@ts-ignore
		e.target.style["z-index"] = focus;
		//@ts-ignore
		e.stopPropagation();
	}
</script>

<!-- top nav area of applet 

if things from svelte

bottom stuff from applet (if needed idk yet) -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<html
	lang="html"
	style="left: {left}px; top: {top}px; width: {width}px; height: {height}px; z-index: {focus + 1};"
	hidden={minimized}
	on:mousedown={mainClick}
>
	<div class="top" on:mousedown={mouseDownTop} on:mouseup={mouseUpTop} />
	<main />
</html>

<svelte:window on:mousemove={mouseMoveTop} on:mouseup={mouseUpTop} />

<style>
	.top {
		height: 50px;
		width: 100%;
		background-color: white;
	}
	html {
		position: relative;
		background-color: rgba(0, 0, 100, 0.5);
	}
</style>
