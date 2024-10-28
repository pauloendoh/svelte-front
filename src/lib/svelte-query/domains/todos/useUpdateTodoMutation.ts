import { queryKeys } from '$lib/svelte-query/queryKeys'
import upsert from '$lib/utils/endoh-utils/upsert'
import { getAuthorizationToken } from '$lib/utils/getAuthorizationToken'
import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
import { getToastStore } from '@skeletonlabs/skeleton'
import { createMutation, useQueryClient } from '@tanstack/svelte-query'
import { isAxiosError } from 'axios'
import type { UpdateTodoBody } from '../../../../orval/myAPI.schemas'
import { updateTodo } from '../../../../orval/todos/todos'

export const useUpdateTodoMutation = () => {
  const toastStore = getToastStore()

  const queryClient = useQueryClient()

  const mutation = createMutation({
    mutationFn: async (input: { data: UpdateTodoBody; todoId: number }) => {
      return updateTodo(input.todoId, input.data, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      })
    },
    onSuccess: (saved) => {
      queryClient.setQueryData<(typeof saved)[]>(queryKeys.todos, (curr) =>
        upsert(curr, saved, (i) => i.id === saved.id),
      )
      toastStore.trigger({
        message: 'To-do updated!',
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
