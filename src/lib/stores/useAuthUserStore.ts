import { cookieKeys } from '$lib/utils/consts/cookieKeys'
import Cookie from 'js-cookie'
import { writable } from 'svelte/store'
import type { SignUp201 } from '../../orval/myAPI.schemas'

const store = writable<SignUp201 | undefined>()

export function useAuthUserStore() {
  return {
    value: store,
    subscribe: store.subscribe,
    set: (data: SignUp201 | undefined) => {
      store.set(data)

      if (!data) {
        Cookie.remove(cookieKeys.user)
        return
      }
      Cookie.set(cookieKeys.user, JSON.stringify(data), {
        secure: true,
        path: '/',
        expires: 30 * 24 * 60 * 60, // 1 year
      })
    },
  }
}
