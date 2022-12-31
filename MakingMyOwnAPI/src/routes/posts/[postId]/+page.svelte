<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<html lang="html">
	<h1>{data.post.title}</h1>
	<p>{data.post.body}</p>
</html>
