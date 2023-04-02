<script lang="ts">
	let htmlWidth: number;
	let htmlHeight: number;
	import AppletWrapper from "./AppletWrapper.svelte";
	import { openApps } from "./modules/stores";

	let height: number, width: number;
	let w2: number, h2: number;
	$: {
		w2 = width / 1.5;
		h2 = height / 1.5;
	}
	function killEl(e: object) {
		//@ts-ignore
		console.log($openApps.splice(e.detail.targetIndex, 1));
		$openApps = $openApps;
	}
</script>

<html
	lang="html"
	on:mousedown
	on:mousemove
	on:mouseup
	on:mouseleave
	bind:clientWidth={htmlWidth}
	bind:clientHeight={htmlHeight}
>
	<div class="apps">
		{#each $openApps as s}
			<div class="app">
				<AppletWrapper
					{...{ ...s, htmlWidth, htmlHeight }}
					bind:focus={s.focus}
					bind:minimized={s.minimized}
					on:selfDestruct={killEl}
				/>
				<!-- {...{ ...s, width: w2, height: h2 }} since width and height get changed within the wrapper, these would have to be bound if they need to be accessed here-->
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
		overflow: hidden;
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
