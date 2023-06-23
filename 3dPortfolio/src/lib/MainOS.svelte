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
		//console.log($openApps);
		//@ts-ignore
		console.log($openApps.splice(e.detail.targetIndex, 1));
		$openApps = $openApps;
		//console.log($openApps);
	}

	export let gamesActive = false;
	export let otherActive = false;
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
	<div style="position: absolute;">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<figure
			class="image is-64x64"
			style="height: 75px; width: 120px; top: 60px; left: 20px;"
			class:folder-active={gamesActive}
			on:click={() => {
				console.log("clicl");
				gamesActive = true;
				otherActive = false;
			}}
		>
			<div class="image is-64x64" style="position: relative; left:30px;">
				<img src="/desktop_folder.png" alt="games" />
				<p style="position: relative; top: -15px; left: 7px;">games</p>
			</div>
		</figure>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<figure
			class="image is-64x64"
			style="height: 75px; width: 120px; top: 75px; left: 20px;"
			class:folder-active={otherActive}
			on:click={() => {
				console.log("clicl");
				gamesActive = false;
				otherActive = true;
			}}
		>
			<div class="image is-64x64" style="position: relative; left:30px;">
				<img src="/desktop_folder.png" alt="other_projects" />
				<p style="position: relative; top: -15px; left: -23px;">other_projects</p>
			</div>
		</figure>
	</div>
	<div class="apps">
		{#each $openApps as s}
			<div class="app">
				<AppletWrapper
					{...{ ...s, htmlWidth, htmlHeight }}
					bind:focus={s.focus}
					bind:minimized={s.minimized}
					on:selfDestruct={killEl}
					bind:top={s.top}
					bind:left={s.left}
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
	.folder-active {
		outline: #82eaff double 2px;
	}
</style>
