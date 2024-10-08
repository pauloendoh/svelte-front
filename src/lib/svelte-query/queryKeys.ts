import type { QueryKey } from '@tanstack/svelte-query'

export const queryKeys = {
  users: ['users'],
  userId: (id: string) => ['users', id],
  todos: ['todos'],

  // comments: () => ['comments'],
  // commentId: (id: string) => ['comment', id],
  // todos: () => ['todos']
} satisfies Record<string, ((...args: any[]) => QueryKey) | QueryKey>
