import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
import { myApi } from '$lib/utils/zodios/myApi'
import { err, ok } from 'neverthrow'
import { schemas } from '../generated/api'

export const sharedSignUp = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const validationRes = schemas.signUp_Body.safeParse(data)

  if (validationRes.error) {
    return err({
      status: 400,
      body: getZodErrorMessage(validationRes.error),
    })
  }

  const signUpResult = await myApi.signUp(validationRes.data, {
    headers: {
      'x-custom-header': 'custom-header-value',
    },
  })

  if (signUpResult.isErr()) {
    return err({
      status: signUpResult.error.response.status,
      body: signUpResult.error.response.data,
    })
  }

  return ok({
    status: 201,
    body: signUpResult.value,
  })
}
