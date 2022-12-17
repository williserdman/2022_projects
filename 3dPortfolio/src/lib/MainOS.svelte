<script lang="ts">
	import AppletWrapper from "./AppletWrapper.svelte";
	import { openApps } from "./modules/stores";
</script>

<html lang="html" on:mousedown on:mousemove on:mouseup on:mouseleave>
	<div class="apps">
		{#each $openApps as s}
			<div class="app">
				<AppletWrapper type={s} />
			</div>
		{/each}
	</div>
</html>

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
