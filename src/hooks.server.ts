import type { Handle } from '@sveltejs/kit'
import axios from 'axios'
import { myEnvs } from './myEnvs'

export const handle: Handle = async ({ event, resolve }) => {
  axios.defaults.baseURL = myEnvs.PUBLIC_API_URL

  const response = await resolve(event)
  return response
}
