<script lang="ts">
	import "bulma";
	let mouse = { x: 0, y: 0, startX: 0, startY: 0 };
	let selector: HTMLDivElement | null = null;
	let canvas: HTMLCanvasElement | null;

	function mouseMoved(event: object) {
		console.log("move event");
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
		console.log("up event");
		if (selector) selector.hidden = true;
		if (canvas) canvas.style.cursor = "default";
	}
	function click() {
		console.log("click");
		mouse.startX = mouse.x;
		mouse.startY = mouse.y;
		if (selector) {
			selector.hidden = false;
			selector.style.left = mouse.x + "px";
			selector.style.top = mouse.y + "px";
			if (canvas) canvas.style.cursor = "crosshair";
		}
	}
</script>

<html lang="html" style="overflow: hidden;">
	<main id="background" class="hero is-fullheight">
		<div class="selector" bind:this={selector} />
		<canvas
			class="is-fullheight hero-body p-0"
			bind:this={canvas}
			on:mousedown={click}
			on:mousemove={mouseMoved}
			on:mouseup={mouseUp}
			on:mouseleave={mouseUp}
		/>
	</main>
</html>

<style>
	#background {
		background: lightgray url(background.jpg) center / cover;
	}

	canvas {
		border: 10px solid transparent;
		position: relative;
	}

	.selector {
		background-color: rgba(1, 1, 1, 0.5);
		position: absolute;
	}
</style>
