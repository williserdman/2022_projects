<script lang="ts">
	//@ts-ingore
	import AppletWrapper from "./AppletWrapper.svelte";
	export let svelteElements: String[];
	//$: console.log(svelteElements);
</script>

<html lang="html">
	<div class="apps">
		{#each svelteElements as s}
			<AppletWrapper type={s} />
		{/each}
	</div>
	<p>this is main os</p>
</html>

<style>
	html {
		background-color: transparent;
	}
	.apps {
	}
</style>
