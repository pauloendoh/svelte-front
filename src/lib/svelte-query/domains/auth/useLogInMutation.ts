import { useAuthUserStore } from '$lib/stores/useAuthUserStore'
import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
import { getToastStore } from '@skeletonlabs/skeleton'
import { createMutation } from '@tanstack/svelte-query'
import { isAxiosError } from 'axios'
import { logIn } from '../../../../orval/auth/auth'
import type { LogInBody } from '../../../../orval/myAPI.schemas'

export const useLogInMutation = () => {
  const authUserStore = useAuthUserStore()
  const toastStore = getToastStore()

  const mutation = createMutation({
    mutationFn: async (data: LogInBody) => {
      return logIn(data).then((res) => res.data)
    },
    onSuccess: (user) => {
      authUserStore.set(user)
      toastStore.trigger({
        message: 'Signed in!',
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
