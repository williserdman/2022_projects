<script lang="ts">
	import "bulma";
	import FooterNav from "$lib/FooterNav.svelte";
	import MainOS from "$lib/MainOS.svelte";

	let mouse = { x: 0, y: 0, startX: 0, startY: 0 };
	let selector: HTMLDivElement | null = null;
	let canvas: HTMLCanvasElement | null;
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
		//console.log("up event");
		if (selector) selector.hidden = true;
		if (canvas) canvas.style.cursor = "default";
	}
	function click() {
		//console.log("click");
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
</script>

<html lang="html" style="overflow: hidden;">
	<main id="background" class="hero is-fullheight">
		<div class="prevent-select" style="position: absolute; background-color: transparent">
			<MainOS bind:svelteElements />
		</div>
		<div class="selector" bind:this={selector} hidden />
		<canvas
			class="is-fullheight hero-body p-0"
			bind:this={canvas}
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
		background: lightgray url(background.jpg) center / cover;
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
</style>
