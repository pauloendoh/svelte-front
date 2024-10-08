import { queryKeys } from '$lib/svelte-query/queryKeys'
import { getAuthorizationToken } from '$lib/utils/getAuthorizationToken'
import { createQuery } from '@tanstack/svelte-query'
import { getUserTodos } from '../../../../orval/todos/todos'

export const useTodosQuery = () => {
  const query = createQuery({
    queryKey: queryKeys.todos,
    queryFn: () =>
      getUserTodos({
        headers: {
          Authorization: getAuthorizationToken(),
        },
      }).then((res) => res.data),
  })
  return query
}
