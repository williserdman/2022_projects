<script lang="ts">
	export let type: String; // prop caught by svelte... ignore squiglies, vscode doesn't know what's up
	export let width: number = 600;
	export let height: number = 400;
	export let minimized: boolean = false;
	console.log(type);
</script>

<!-- top nav area of applet 

if things from svelte

bottom stuff from applet (if needed idk yet) -->

<main bind:clientWidth={width} bind:clientHeight={height} />

<style>
	main {
		background-color: white;
	}
</style>
