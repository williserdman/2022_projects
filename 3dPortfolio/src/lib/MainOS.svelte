<script lang="ts">
	import AppletWrapper from "./AppletWrapper.svelte";
	import { openApps } from "./modules/stores";
</script>

<html lang="html">
	<div class="apps">
		{#each $openApps as s}
			<AppletWrapper type={s} />
		{/each}
	</div>
	<p>this is main os</p>
</html>

<style>
	html {
		background-color: transparent;
		width: 100%;
		height: 100%;
	}
	.apps {
		width: 100%;
		height: 100%;
	}
</style>
