<script lang="ts">
	import { openApps } from "./modules/stores";
	export let type: string = ""; // prop caught by svelte... ignore squiglies, vscode doesn't know what's up
	export let width: number = 800;
	let ratio: number, bigHeight: number, bigWidth: number;
	$: {
		ratio = height / width;
		bigWidth = 1280;
		bigHeight = bigWidth * ratio;
		ratio = height / bigHeight;
		// console.log(ratio);
	}
	export let height: number = 600;
	export let minimized: boolean = false;
	export let focus: number;
	export let left = 100;
	export let top = 100;
	let moving = false;

	let cover = false;

	function mouseDownTop(e: object) {
		//@ts-ignore
		mainClick({ ...e, target: e.target.parentElement }); // propogation stopped in here

		console.log("mdt");
		cover = true;
		//@ts-ignore
		e.stopPropagation();
		moving = true;
	}
	function mouseUpTop() {
		cover = false;
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
		console.log("main click", type);
		// local var focus for corresponding elment, and all others in $openApps
		let lMax = -1;
		$openApps.forEach((i) => {
			if (i.focus > lMax) lMax = i.focus;
		});

		//console.log($openApps);
		focus = lMax + 1;
		//console.log($openApps);
		//@ts-ignore
		e.target.style["z-index"] = focus;
		isFocus = true;

		try {
			//@ts-ignore
			e.stopPropagation();
		} catch (err) {
			// when e is passed from the clickTop function, it doesn't have a stopPropogation function
			//console.error(err);
		}
	}

	let isFocus = true;
	openApps.subscribe((oa) => {
		oa.forEach((i) => {
			if (i.focus > focus) isFocus = false;
		});
	});
</script>

<!-- top nav area of applet 

if things from svelte

bottom stuff from applet (if needed idk yet) -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<html
	lang="html"
	style="top: {top - 30}px; left: {left}px; z-index: {focus + 1};"
	hidden={minimized}
>
	<div
		class="no-focus-cover"
		hidden={isFocus}
		style="z-index: {focus + 1}; top: 30px;"
		on:mousedown={mainClick}
	/>
	<div class="top" on:mousedown={mouseDownTop} />
	<div
		class="top-cover"
		on:mouseup={mouseUpTop}
		on:mousemove={mouseMoveTop}
		on:mouseleave={mouseUpTop}
		hidden={!cover}
	/>
	<main
		lang="html"
		style="left: {left}px; top: {top}px; width: {width}px; height: {height}px;"
		on:mousedown={mainClick}
	>
		<div>
			{#if type == "projects"}
				<!-- svelte-ignore a11y-missing-attribute -->
				<iframe
					src="screen/projects"
					style="width: {bigWidth}px; height: {bigHeight}px; transform: translate(-{(bigWidth -
						width) /
						2}px, -{(bigHeight - height) / 2}px) scale({ratio});"
				/>
			{/if}
		</div>
	</main>
</html>

<style>
	.top {
		position: relative;
		height: 30px;
		width: 100%;
		background-color: lightgrey;
	}

	.no-focus-cover {
		position: absolute;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 150, 0, 0);
	}
	.top-cover {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(255, 0, 0, 0);
		z-index: 999999999999;
	}
	html {
		position: relative;
		background-color: rgba(0, 0, 100, 0.5);
		overflow: hidden;
	}
</style>
