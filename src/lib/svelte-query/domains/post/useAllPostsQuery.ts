import { queryKeys } from '$lib/svelte-query/queryKeys';
import { createQuery } from '@tanstack/svelte-query';
import { getAllPosts } from '../../../../orval/posts/posts';

export const useAllPostsQuery = () => {
	const query = createQuery({
		queryKey: queryKeys.posts,
		queryFn: () => getAllPosts().then((res) => res.data)
	});
	return query;
};
