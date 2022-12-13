<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();
	function handle(type: String) {
		dispatch("itemClick", {
			type: type
		});
	}
</script>

<html lang="html" style="max-height: inherit;">
	<div class="my-cols">
		<div class="my-col">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				draggable="false"
				src="start_button.webp"
				alt="start"
				on:click={() => handle("start")}
				style="width; 2rem; height: 2rem;"
			/>
		</div>
		<div class="my-col">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				draggable="false"
				src="file_explorer.png"
				alt="projects"
				on:click={() => handle("projects")}
				style="width; 2rem; height: 2rem;"
			/>
		</div>
		<div class="my-col">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				draggable="false"
				src="settings_cog.png"
				alt="settings"
				on:click={() => handle("settings")}
				style="width; 2rem; height: 2rem;"
			/>
		</div>
	</div>
</html>

<style>
	* {
		background-color: transparent;
		height: 100%;
	}
	.my-cols {
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
	}
	.my-col {
		height: 3rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	.my-col:hover {
		background-color: lightblue;
	}
	.my-col:active {
		background-color: white;
	}
</style>
