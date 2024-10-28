import { queryKeys } from '$lib/svelte-query/queryKeys'
import { createQuery } from '@tanstack/svelte-query'
import { getUserTodos } from '../../../../orval/todos/todos'

export const useTodosQuery = () => {
  const query = createQuery({
    queryKey: queryKeys.todos,
    queryFn: () => getUserTodos(),
  })
  return query
}
