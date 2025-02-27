import { sql } from '$lib/db';
import type { Post } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const post = await sql`
        SELECT posts.content, posts.created_at, posts.edited_at, users.name, users.username, users.avatar, users.created_at
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        WHERE posts.id = ${params.post} AND users.username = ${params.username}
    `;

	return {
		post: {
			id: parseInt(params.post),
			content: post[0].content,
			created_at: post[0].created_at,
			edited_at: post[0].edited_at,
			user: {
				name: post[0].name,
				username: post[0].username,
				avatar: post[0].avatar,
				created_at: post[0].created_at
			}
		} satisfies Post
	};
}) satisfies PageServerLoad;
