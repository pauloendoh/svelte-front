import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { getAuthorizationToken } from './getAuthorizationToken'

// add a second `options` argument here if you want to pass extra options to each generated query
export const myRequest = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  // const source = Axios.CancelToken.source()

  const promise = axios({
    ...config,
    ...options,
    headers: {
      ...config.headers,
      ...options?.headers,
      Authorization: getAuthorizationToken(),
    },
    // cancelToken: source.token,
  }).then(({ data }) => data)

  // // @ts-expect-error:  Property 'cancel' does not exist on type 'Promise<T>'
  // promise.cancel = () => {
  //   source.cancel('Query was cancelled')
  // }

  return promise
}
