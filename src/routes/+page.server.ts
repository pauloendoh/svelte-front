import type { Actions } from '@sveltejs/kit'
import { signUpBody } from '../orval/auth/auth.zod'

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = Object.fromEntries(await request.formData())

    signUpBody.parse(data)

    return {
      status: 200,
      body: 'Hello world!',
    }
  },
}
