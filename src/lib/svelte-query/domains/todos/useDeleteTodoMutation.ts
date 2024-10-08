import { queryKeys } from '$lib/svelte-query/queryKeys'
import deleteFromArray from '$lib/utils/endoh-utils/deleteFromArray'
import { getAuthorizationToken } from '$lib/utils/getAuthorizationToken'
import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
import { getToastStore } from '@skeletonlabs/skeleton'
import { createMutation, useQueryClient } from '@tanstack/svelte-query'
import { isAxiosError } from 'axios'
import { deleteTodo } from '../../../../orval/todos/todos'

export const useDeleteTodoMutation = () => {
  const toastStore = getToastStore()

  const queryClient = useQueryClient()

  const mutation = createMutation({
    mutationFn: async (todoId: number) => {
      return deleteTodo(todoId, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      }).then((res) => res.data)
    },
    onSuccess: (returned, todoId) => {
      queryClient.setQueryData<(typeof returned)[]>(queryKeys.todos, (curr) =>
        deleteFromArray(curr, (i) => i.id === todoId),
      )
      toastStore.trigger({
        message: 'To-do deleted!',
        background: 'variant-filled-success',
      })
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const zodErrorMessage = getZodErrorMessage(error.response?.data)
        const dataMessage =
          typeof error.response?.data === 'string'
            ? error.response?.data
            : undefined

        toastStore.trigger({
          message: zodErrorMessage ?? dataMessage ?? error.message,
          background: 'bg-red-500',
        })
      }
    },
  })

  return mutation
}
