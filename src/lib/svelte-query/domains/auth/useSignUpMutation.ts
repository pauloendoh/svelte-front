import { useAuthUserStore } from '$lib/stores/useAuthUserStore'
import type { SignUpHeader } from '$lib/utils/types/orval/SignUpHeader'
import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
import { getToastStore } from '@skeletonlabs/skeleton'
import { createMutation } from '@tanstack/svelte-query'
import { isAxiosError } from 'axios'
import { signUp } from '../../../../orval/auth/auth'
import type { SignUpBody } from '../../../../orval/myAPI.schemas'

export const useSignUpMutation = () => {
  const authUserStore = useAuthUserStore()
  const toastStore = getToastStore()

  const mutation = createMutation({
    mutationFn: async (data: SignUpBody) => {
      return signUp(data, {
        headers: {
          'x-custom-header': 'testing ts-rest custom header',
        } satisfies SignUpHeader,
      })
    },
    onSuccess: (returned) => {
      authUserStore.set(returned)
      toastStore.trigger({
        message: 'Account created!',
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
