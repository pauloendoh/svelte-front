import type { QueryKey } from '@tanstack/svelte-query';

export const queryKeys = {
	posts: ['posts'],
	postId: (id: string) => ['post', id]
	// comments: () => ['comments'],
	// commentId: (id: string) => ['comment', id],
	// todos: () => ['todos']
} satisfies Record<string, ((...args: any[]) => QueryKey) | QueryKey>;
