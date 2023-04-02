<script lang="ts">
	import { openApps } from "./modules/stores";

	const getTopFocus = () => {
		// messy but makes focus the greatest val out there
		let m = -1;
		$openApps.forEach((i) => {
			if (i.focus > m) m = i.focus;
		});
		return ++m;
	};

	function handle(type: string) {
		//@ts-ignore
		if (!$openApps.some((v) => v.type == type)) {
			//if it's not already open
			//@ts-ignore
			$openApps.push({
				type: type,
				focus: getTopFocus(),
				minimized: false
			});
			$openApps = $openApps;
		} else {
			// if it is already open
			console.log("already open", type);
			$openApps.forEach((openApp) => {
				if (openApp.type == type) {
					// this assumes only one instance of each app open at any time, could use some for of IDs to have multiple apps open of the same type, kinda the purpose of oop
					openApp.minimized = !openApp.minimized;
					console.log(openApp.minimized);
					if (openApp.minimized == false) {
						openApp.focus = getTopFocus();
					}
				}
			});

			$openApps = $openApps; // NEED the AppletWrapper to "react" to the minimized change, this forces it
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
				on:mousedown={() => handle("start")}
				style="width; 32px; height: 32px;"
			/>
		</div>
		<div class="my-col" bind:this={fileExplorerEl}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				draggable="false"
				src="file_explorer.png"
				alt="projects"
				on:mousedown={() => handle("projects")}
				style="width; 32px; height: 32px;"
			/>
		</div>
		<div class="my-col" bind:this={settingsEl}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<img
				draggable="false"
				src="settings_cog.png"
				alt="settings"
				on:mousedown={() => handle("settings")}
				style="width; 32px; height: 32px;"
			/>
		</div>
	</div>
</html>

<style>
	* {
		/* background-color: transparent; */
		height: 100%;
		overflow: hidden;
	}
	.my-cols {
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
	}
	.my-col {
		height: 48px;
		padding-top: 8px;
		padding-bottom: 8px;
		padding-left: 8px;
		padding-right: 8px;
		margin-left: 3.2px;
		margin-right: 3.2px;
	}
	.my-col:hover {
		background-color: lightblue !important; /* needed to overrule the js */
	}
	.my-col:active {
		background-color: blue !important;
	}
</style>
