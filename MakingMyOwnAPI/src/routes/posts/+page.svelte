<script lang="ts">
	import type { PageData } from "./$types";

	/** @type {import('./$types').PageData} */
	export let data: PageData;
</script>

<html lang="html">
	<div>
		{#each data.posts as post}
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		{/each}
	</div>
</html>
