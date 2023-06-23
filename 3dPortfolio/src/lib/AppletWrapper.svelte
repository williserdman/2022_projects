<script lang="ts">
	import { onMount } from "svelte";
	import { openApps } from "./modules/stores";
	import { createEventDispatcher } from "svelte";
	export let type: string = ""; // prop caught by svelte... ignore squiglies, vscode doesn't know what's up
	export let width: number = 800;
	let ratio: number;
	let bigHeight: number = 1080;
	const bigWidth: number = 1920;
	let main: HTMLElement | null;
	export let height: number = 600;
	export let minimized: boolean = false;
	export let focus: number;
	export let left = 100;
	export let top = 100;
	export let htmlHeight: number;
	export let htmlWidth: number;
	let moving = false;

	let cover = false;

	let mounted = false;

	$: {
		ratio = height / width;
		bigHeight = bigWidth * ratio;
		ratio = height / bigHeight;
	}

	function mouseDownTop(e: object) {
		//console.log(width, "start of mdt");
		//@ts-ignore
		mainClick({ ...e, target: e.target.parentElement }); // propogation stopped in here

		//console.log("mdt");
		cover = true;
		//@ts-ignore
		e.stopPropagation();
		moving = true;
		//console.log(width, "end of mdt");
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
			top < 30 ? (top = 30) : {};
		}
	}
	function mainClick(e: object) {
		//console.log("main click", type);
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

	const dispatch = createEventDispatcher();
	function closeApp() {
		let indexOfThisApp;
		let index = 0;
		$openApps.forEach((item) => {
			console.log(item);
			if (item.type == type) {
				console.log("returning", index);
				indexOfThisApp = index;
			}
			++index;
		});

		console.log(indexOfThisApp);
		//console.log(indexOfThisApp);

		dispatch("selfDestruct", {
			targetIndex: indexOfThisApp
		});
	}

	function minimizeApp(e: object) {
		//console.log("minimizing");
		minimized = !minimized;
		//@ts-ignore
		e.stopPropagation();
	}

	function maximizeApp(e: object) {
		width = htmlWidth;
		height = htmlHeight - 80; // should accound for size of navbar
		left = 0;
		top = 30;
		//console.log("making big");
		//@ts-ignore
		e.stopPropagation();
	}

	let isFocus = true;
	openApps.subscribe((oa) => {
		oa.forEach((i) => {
			if (i.focus > focus) isFocus = false;
		});
	});
</script>

<!-- svelte-ignore non-top-level-reactive-declaration -->
<!-- svelte-ignore non-top-level-reactive-declaration -->
<!-- top nav area of applet 

if things from svelte

bottom stuff from applet (if needed idk yet) -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<html
	lang="html"
	style="top: {top - 30}px; left: {left}px; z-index: {focus + 1}; border-radius: 10px;"
	hidden={minimized}
>
	<div
		class="no-focus-cover"
		hidden={isFocus}
		style="z-index: {focus + 1}; top: 30px;"
		on:mousedown={mainClick}
	/>
	<div class="top" on:mousedown={mouseDownTop}>
		<div>
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<div
				id="close-button"
				style="position: relative; top: 10px; left: 10px; width: 10px; height: 10px; border-radius: 5px; background-color: red;"
				on:mouseenter={(e) => {
					//@ts-ignore
					e.target.innerHTML =
						'<p style="position: absolute; top: -3.2px; left: 2.2px; font-weight: bolder; color: #8a0000; font-size: 10px;">x</p>';
				}}
				on:mouseleave={(e) => {
					//@ts-ignore
					e.target.innerHTML = "";
				}}
				on:mousedown={closeApp}
			/>
			<div
				id="minimize-button"
				style="position: absolute; top: 10px; left: 25px; width: 10px; height: 10px; border-radius: 5px; background-color: orange;"
				on:mouseenter={(e) => {
					//@ts-ignore
					e.target.innerHTML =
						'<p style="position: absolute; top: -9.6px; left: 0.8px; font-weight: bolder; color: #b57b0d; font-size: 18px;">-</p>';
				}}
				on:mouseleave={(e) => {
					//@ts-ignore
					e.target.innerHTML = "";
				}}
				on:mousedown={minimizeApp}
			/>
			<div
				id="maximize-button"
				style="position: absolute; top: 10px; left: 40px; width: 10px; height: 10px; border-radius: 5px; background-color: hsl(126.8, 100%, 36.3%);"
				on:mouseenter={(e) => {
					//@ts-ignore
					e.target.innerHTML =
						'<p style="position: absolute; top: -8.6px; left: -0.3px; font-weight: bolder; color: #091;">+</p>';
				}}
				on:mouseleave={(e) => {
					//@ts-ignore
					e.target.innerHTML = "";
				}}
				on:mousedown={maximizeApp}
			/>
		</div>
	</div>
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
		bind:this={main}
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
			{:else}
				<p class="has-text-white m-3">This project is one that I consider a "long-term project." Which is my way of saying that I'm aware that it's not quite ready for production. I promise something is in the works for this page, it's just not quite polished enough to publish!</p>
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
