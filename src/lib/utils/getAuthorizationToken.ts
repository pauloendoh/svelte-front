import type { SignUp201 } from '../../orval/myAPI.schemas'
import { cookieKeys } from './consts/cookieKeys'
import { myCookie } from './myCookie'

export function getAuthorizationToken() {
  const userCookieStr = myCookie.get(cookieKeys.user)

  if (!userCookieStr) {
    throw new Error('No user cookie found')
  }

  const user: SignUp201 = JSON.parse(userCookieStr)

  return `Bearer ${user.token}`
}
