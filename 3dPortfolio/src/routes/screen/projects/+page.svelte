<script lang="ts">
	import "bulma";

	interface Project {
		title: string;
		desc: string;
		abrDesc: string;
		link: string;
		githubLink: string;
	}

	let activeProject: Project | null = null;
	const projects: Project[] = [
		{
			title: "title",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat exercitationem, maiores tenetur incidunt impedit, molestias vero dolorem, corrupti ex adipisci quam iure doloribus. Ut consequatur fugit optio quae nostrum!",
			abrDesc: "short desc",
			link: "https://threejs.org/",
			githubLink: "https://github.com/williserdman"
		},
		{
			title: "title",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quaerat exercitationem, maiores tenetur incidunt impedit, molestias vero dolorem, corrupti ex adipisci quam iure doloribus. Ut consequatur fugit optio quae nostrum!",
			abrDesc: "short desc",
			link: "https://threejs.org/",
			githubLink: ""
		},
		{
			title: "title",
			desc: " no lorem",
			abrDesc: "short desc",
			link: "https://threejs.org/",
			githubLink: ""
		}
	];

	function setPreview(project: Project) {
		activeProject = project;
	}
</script>

<html lang="html" style="overflow: hidden;">
	<div class="columns m-0" style="height: 100%;">
		<div style="height: 100%; overflow: auto;" class="column is-one-third p-5 rhs-shadow">
			{#each projects as project}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="box" on:click={() => setPreview(project)}>
					<h4 class="is-4 has-text-weight-bold">{project.title}</h4>
					<p>{project.abrDesc}</p>
				</div>
			{/each}
		</div>
		<div class="column" style="position: relative; width: 100%; height: 100%; ">
			<div
				class="has-text-centered"
				style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"
			>
				{#if activeProject}
					<div style="height: 100%; width: 100%;">
						<iframe
							style="border: 10px solid darkgrey; background-color: lightgrey;"
							class="proj-prev m-6"
							title={activeProject.title}
							src={activeProject.link}
							frameborder=""
						/>
						<p>{activeProject.desc}</p>
					</div>
				{:else}
					<div>
						<img src="/loading.gif" alt="Loading..." style="height: 200px; width: 200px;" />
						<p>Select a project to begin...</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</html>

<style>
	html {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
	.rhs-shadow {
		height: 100%;
		box-shadow: 3px 0px 10px lightgrey;
	}
	.proj-prev {
		width: 90%;
		height: 50%;
	}
</style>
