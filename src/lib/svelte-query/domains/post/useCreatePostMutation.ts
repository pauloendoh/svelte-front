import { queryKeys } from '$lib/svelte-query/queryKeys';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import type { CreatePost201, CreatePostBody } from '../../../../orval/myAPI.schemas';
import { createPost } from '../../../../orval/posts/posts';

export const useCreatePostMutation = () => {
	const client = useQueryClient();

	return createMutation({
		mutationFn: (data: CreatePostBody) => createPost(data).then((res) => res.data),
		onSuccess: async (saved) => {
			client.setQueryData<CreatePost201[]>(queryKeys.posts, (prev) => {
				if (!prev) return [saved];
				return [...prev, saved];
			});
		}
	});
};
