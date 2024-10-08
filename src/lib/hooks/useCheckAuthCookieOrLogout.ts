import { useAuthUserStore } from '$lib/stores/useAuthUserStore'
import { cookieKeys } from '$lib/utils/consts/cookieKeys'
import { myCookie } from '$lib/utils/myCookie'
import { writable } from 'svelte/store'
import { getMe } from '../../orval/auth/auth'
import type { SignUp201 } from '../../orval/myAPI.schemas'
import { useLogout } from './useLogout'

const loadingStore = writable(true)

export const useCheckAuthCookieOrLogout = () => {
  const logout = useLogout()
  const authUserStore = useAuthUserStore()

  const checkAuthCookieOrLogout = () => {
    const userCookieStr = myCookie.get(cookieKeys.user)

    if (!userCookieStr) {
      loadingStore.set(false)

      return
    }

    const user: SignUp201 = JSON.parse(userCookieStr)
    if (new Date(user.tokenExpiresAt) <= new Date()) {
      logout()
      loadingStore.set(false)
      return
    }

    getMe({
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        authUserStore.set(res.data)
      })
      .catch((err) => {
        alert(err.message)
        logout()
      })
      .finally(() => {
        loadingStore.set(false)
      })
  }

  return {
    checkAuthCookieOrLogout,
    loadingCheckAuthCookie: loadingStore,
  }
}
