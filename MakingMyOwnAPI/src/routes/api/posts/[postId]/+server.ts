import type { RequestEvent } from "./$types";

/** @type {import('./$types').RequestEvent} */
export const GET = async ({ params }: RequestEvent) => {
	console.log(params);
	const res = await fetch(`https://dummyjson.com/posts/${params.postId}`);
	const data = await res.json();
	console.log(data);

	return new Response(JSON.stringify(data));
};
