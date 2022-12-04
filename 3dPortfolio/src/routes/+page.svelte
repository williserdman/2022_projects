<script lang="ts" type="module">
	import { onMount } from "svelte";
	import { createScene } from "./main";

	onMount(() => {
		createScene();
	});
</script>
