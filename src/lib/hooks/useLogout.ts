import { goto } from '$app/navigation'
import { useAuthUserStore } from '$lib/stores/useAuthUserStore'

export const useLogout = (options?: { forceLogout: boolean }) => {
  const logout = async () => {
    // if (authUser?.tokenExpiresAt && !options?.forceLogout) {
    //   openConfirmDialog({
    //     title: 'Logout',
    //     description:
    //       'Are you sure you want to logout? You will lose your temporary user data.',
    //     onConfirm: () => {
    //       resetAuthStore()
    //       router.push(urls.pages.indexAndRedirectTo(router.asPath))
    //     },
    //   })

    //   return
    // }

    useAuthUserStore().set(undefined)

    goto('/')
  }

  return logout
}
