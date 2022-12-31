import { SECRET_API_KEY as key } from "$env/static/private";

import type { RequestEvent } from "./$types";
/** @type {import('./$types').RequestEvent} */

export async function GET({ request, url }: RequestEvent) {
	const authHeader = request.headers.get("Authorization");
	console.log(key);

	/* if (authHeader !== "correctAuthHeader") {
		return new Response(JSON.stringify({ message: "invalid creds" }), { status: 401 });
	} */

	const limit = Number(url.searchParams.get("limit") ?? 10);
	const skip = Number(url.searchParams.get("limit") ?? 0);

	const res = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
	const data = await res.json();

	console.log(authHeader);

	return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST({ request, url }: RequestEvent) {
	const authHeader = request.headers.get("Authorization");
	if (authHeader !== "correctAuthHeader") {
		return new Response(JSON.stringify({ message: "invalid creds" }), { status: 401 });
	}

	const body = await request.json();
	console.log(body);

	return new Response(JSON.stringify({ message: "success" }), { status: 201 });
}
