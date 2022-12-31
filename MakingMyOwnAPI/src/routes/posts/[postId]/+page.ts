import type { PageLoad } from "./$types";
/** @type {import('./$types').PageLoad} */

export const load: PageLoad = ({ fetch, params }) => {
	const fetchPost = async (id: number) => {
		const res = await fetch(`/api/posts/${id}`);
		const data = await res.json();
		return data;
	};

	return {
		post: fetchPost(Number(params.postId))
	};
};
