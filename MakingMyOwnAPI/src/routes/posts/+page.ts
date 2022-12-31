import type { PageLoad } from "./$types";

/** @type {import('./$types').PageLoad} */

export const load: PageLoad = async ({ fetch }) => {
	const fetchPosts = async () => {
		const res = await fetch("/api/posts");
		const data = await res.json();
		return data.posts;
	};
	return {
		posts: fetchPosts()
	};
};
