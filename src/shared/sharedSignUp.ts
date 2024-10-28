import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
import { isAxiosError } from 'axios'
import { err, ok } from 'neverthrow'
import { signUp } from '../orval/auth/auth'
import { signUpBody } from '../orval/auth/auth.zod'

export const sharedSignUp = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const validationRes = signUpBody.safeParse(data)

  if (validationRes.error) {
    return err({
      status: 400,
      body: getZodErrorMessage(validationRes.error),
    })
  }

  const signUpResult = await signUp(validationRes.data, {
    headers: {
      'x-custom-header': 'custom-header-value',
    },
  })
    .then((data) => {
      return ok({
        status: 200,
        body: data,
      })
    })
    .catch((error) => {
      if (isAxiosError(error)) {
        return err({
          status: error.response?.status,
          body: error.response?.data,
        })
      }

      return err({
        status: 500,
        body: 'Internal server error',
      })
    })

  return signUpResult
}
