import { fail, type Actions } from '@sveltejs/kit'
import { sharedSignUp } from '../shared/sharedSignUp'
import type { PageServerLoad } from './$types.js'

const lastMessage = 'lastMessage'

export const load: PageServerLoad = async ({ cookies }) => {
  return {
    lastMessage: lastMessage,
  }
}

export const actions = {
  signUp: async ({ request }) => {
    const formData = await request.formData()

    const result = await sharedSignUp(formData)

    if (result.isErr()) {
      return fail(result.error.status ?? 500, {
        message: result.error.body,
      })
    }

    return {
      status: result.value.status,
      body: result.value.body,
    }
  },
} satisfies Actions

export type IndexPageActions = typeof actions
