<script lang="ts">
	import "bulma";
	import FooterNav from "$lib/FooterNav.svelte";
	import MainOS from "$lib/MainOS.svelte";

	let mouse = { x: 0, y: 0, startX: 0, startY: 0 };
	let selector: HTMLDivElement | null = null;
	let canvas: HTMLElement | null;
	let svelteElements: String[] = [];

	function mouseMoved(event: object) {
		//@ts-ignore
		mouse.x = event.clientX;
		//@ts-ignore
		mouse.y = event.clientY;

		if (selector && !selector.hidden) {
			selector.style.width = Math.abs(mouse.x - mouse.startX).toString() + "px";
			selector.style.height = Math.abs(mouse.y - mouse.startY).toString() + "px";
			selector.style.left = mouse.x - mouse.startX < 0 ? mouse.x + "px" : mouse.startX + "px";
			selector.style.top = mouse.y - mouse.startY < 0 ? mouse.y + "px" : mouse.startY + "px";
		}
	}
	function mouseUp() {
		if (selector) selector.hidden = true;
		if (canvas) canvas.style.cursor = "default";
	}
	let folder1InFocus = false;
	let folder2InFocus = false;
	function click() {
		folder1InFocus = false;
		folder2InFocus = false;
		console.log("firing main");
		//@ts-ignore
		canvas = this;
		mouse.startX = mouse.x;
		mouse.startY = mouse.y;
		if (selector) {
			selector.style.width = "0";
			selector.style.height = "0";
			selector.hidden = false;
			selector.style.left = mouse.x + "px";
			selector.style.top = mouse.y + "px";
			if (canvas) canvas.style.cursor = "crosshair";
		}
	}
	function handleAppClick(event: object) {
		//@ts-ignore
		const type: String = event.detail.type;
		svelteElements.push(type);
		svelteElements = svelteElements; // so the jit compiler knows that it's chagned
	}
	function setBackground(e: any) {
		console.log(e);
		console.log(typeof e);
	}
</script>

<html lang="html" style="overflow: hidden;">
	<main id="background" class="hero is-fullheight">
		<div class="prevent-select main-os">
			<MainOS
				on:mousedown={click}
				on:mousemove={mouseMoved}
				on:mouseup={mouseUp}
				on:mouseleave={mouseUp}
				bind:gamesActive={folder1InFocus}
				bind:otherActive={folder2InFocus}
			/>
		</div>
		<div class="selector" bind:this={selector} hidden />
		<canvas
			class="is-fullheight hero-body p-0"
			on:mousedown={click}
			on:mousemove={mouseMoved}
			on:mouseup={mouseUp}
			on:mouseleave={mouseUp}
		/>
		<footer
			class="hero-footer has-shadow"
			style="height: 3rem; background-color: rgba(255, 255, 255, 0.85);"
		>
			<div class="prevent-select" style="height: 100%;">
				<FooterNav on:itemClick={handleAppClick} />
			</div>
		</footer>
	</main>
</html>

<style>
	.prevent-select {
		-webkit-user-select: none; /* Safari */
		-ms-user-select: none; /* IE 10 and IE 11 */
		user-select: none; /* Standard syntax */
	}
	#background {
		background: lightgray url(/background.jpg) center / cover;
	}

	canvas {
		border: 10px solid transparent;
		position: relative;
		border-bottom: 0;
	}

	.selector {
		background-color: rgba(255, 255, 255, 0.3);
		border: 1px dotted gray;
		position: absolute;
	}
	footer {
		box-shadow: -10px 0 40px -2px;
	}
	.main-os {
		position: fixed;
		width: 100%;
		height: 100%;
		margin-top: -3rem;
		z-index: 1;
	}
	* {
		overflow: hidden;
	}
</style>
