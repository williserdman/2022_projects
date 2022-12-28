<script lang="ts">
	import { openApps } from "./modules/stores";
	export let type: string = ""; // prop caught by svelte... ignore squiglies, vscode doesn't know what's up
	export let width: number = 800;
	export let height: number = 600;
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
	document.addEventListener("mouseup", mouseUpTop);
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
	console.log($openApps);
</script>

<!-- top nav area of applet 

if things from svelte

bottom stuff from applet (if needed idk yet) -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="top"
	style="top: {top}px; left: {left}px"
	on:mousedown={mouseDownTop}
	on:mouseup={mouseUpTop}
/>
<html
	lang="html"
	style="left: {left}px; top: {top}px; width: {width}px; height: {height}px; z-index: {focus + 1};"
	hidden={minimized}
	on:mousedown={mainClick}
>
	<main>
		{#if type == "projects"}
			<!-- svelte-ignore a11y-missing-attribute -->
			<iframe src="screen/projects" style="width: {width}px; height: {height}px;" />
		{/if}
	</main>
</html>

<svelte:window on:mousemove={mouseMoveTop} on:mouseup={mouseUpTop} on:mouseleave={mouseUpTop} />

<style>
	.top {
		position: relative;
		height: 30px;
		width: 100%;
		background-color: lightgrey;
	}
	html {
		position: relative;
		background-color: rgba(0, 0, 100, 0.5);
		overflow: hidden;
	}
</style>
