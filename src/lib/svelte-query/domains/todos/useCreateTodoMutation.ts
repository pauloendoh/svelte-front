import { queryKeys } from '$lib/svelte-query/queryKeys'
import upsert from '$lib/utils/endoh-utils/upsert'
import { getAuthorizationToken } from '$lib/utils/getAuthorizationToken'
import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
import { getToastStore } from '@skeletonlabs/skeleton'
import { createMutation, useQueryClient } from '@tanstack/svelte-query'
import { isAxiosError } from 'axios'
import type { CreateTodoBody } from '../../../../orval/myAPI.schemas'
import { createTodo } from '../../../../orval/todos/todos'

export const useCreateTodoMutation = () => {
  const toastStore = getToastStore()

  const queryClient = useQueryClient()

  const mutation = createMutation({
    mutationFn: async (input: CreateTodoBody) => {
      return createTodo(input, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      }).then((res) => res.data)
    },
    onSuccess: (saved, input) => {
      queryClient.setQueryData<(typeof saved)[]>(queryKeys.todos, (curr) =>
        upsert(curr, saved, (i) => i.id === saved.id),
      )
      toastStore.trigger({
        message: 'To-do created!',
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
