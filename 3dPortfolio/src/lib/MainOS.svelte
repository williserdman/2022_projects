<script lang="ts">
	import AppletWrapper from "./AppletWrapper.svelte";
	import { openApps } from "./modules/stores";

	let height: number, width: number;
	let w2: number, h2: number;
	$: {
		w2 = width / 1.5;
		h2 = height / 1.5;
	}
</script>

<html lang="html" on:mousedown on:mousemove on:mouseup on:mouseleave>
	<div class="apps">
		{#each $openApps as s}
			<div class="app">
				<AppletWrapper {...{ ...s, width: w2, height: h2 }} bind:focus={s.focus} />
			</div>
		{/each}
	</div>
</html>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<style>
	html {
		background-color: transparent;
		width: 100%;
		height: 100%;
	}
	.apps {
		position: relative;
		margin-top: 3rem;
	}
	.app {
		position: absolute;
		/* background-color: rgba(0, 100, 0, 0.5); */
	}
</style>
