<script lang="ts">
	import { openApps } from "./modules/stores";

	function handle(type: string) {
		//@ts-ignore
		if (!$openApps.some((v) => v.type == type)) {
			//@ts-ignore
			$openApps.push({
				type: type,
				focus: (() => {
					// messy but makes focus the greatest val out there
					let m = -1;
					$openApps.forEach((i) => {
						if (i.focus > m) m = i.focus;
					});
					return ++m;
				})(),
				minimized: false
			});
			$openApps = $openApps;
		}
	}

	let startButtonEl: HTMLDivElement, fileExplorerEl: HTMLDivElement, settingsEl: HTMLDivElement;
	$: {
		//@ts-ignore
		if ($openApps.some((v) => v.type == "start")) startButtonEl.style.background = "lightgrey";
		//@ts-ignore
		if ($openApps.some((v) => v.type == "projects")) fileExplorerEl.style.background = "lightgrey";
		//@ts-ignore
		if ($openApps.some((v) => v.type == "settings")) settingsEl.style.background = "lightgrey";
	}
</script>

<html lang="html" style="max-height: inherit;">
	<div class="my-cols">
		<div class="my-col" bind:this={startButtonEl}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				draggable="false"
				src="start_button.webp"
				alt="start"
				on:click={() => handle("start")}
				style="width; 2rem; height: 2rem;"
			/>
		</div>
		<div class="my-col" bind:this={fileExplorerEl}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				draggable="false"
				src="file_explorer.png"
				alt="projects"
				on:click={() => handle("projects")}
				style="width; 2rem; height: 2rem;"
			/>
		</div>
		<div class="my-col" bind:this={settingsEl}>
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
		/* background-color: transparent; */
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
		margin-left: 0.2rem;
		margin-right: 0.2rem;
	}
	.my-col:hover {
		background-color: lightblue;
	}
	.my-col:active {
		background-color: white;
	}
</style>
