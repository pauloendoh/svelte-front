import type {
  Aliases,
  ZodiosAliases,
  ZodiosMatchingErrorsByAlias,
  ZodiosResponseByAlias,
} from '@zodios/core/lib/zodios.types'
import { err, ok, type ResultAsync } from 'neverthrow'
import { createApiClient, endpoints } from '../../../generated/api'
import { myEnvs } from '../../../myEnvs'
import { isApiError } from './isApiError'

const client = createApiClient(myEnvs.API_URL)

type Endpoints = typeof endpoints
type Alias = Aliases<Endpoints>

type MyZodiosAliases = ZodiosAliases<Endpoints>

const aliases = endpoints.map((e) => e.alias)

function getApiWithReturnTypes() {
  // generate an object that
  const obj = {} as Record<Alias, (...args: any) => unknown>

  for (const alias of aliases) {
    obj[alias] = async (...args: any) => {
      try {
        const data = await client[alias](args[0], args[1])
        return ok(data)
      } catch (error) {
        if (isApiError(alias, error)) {
          return err(error)
        }
      }
    }
  }

  return obj as {
    [K in Alias]: (
      ...args: Parameters<MyZodiosAliases[K]>
    ) => Promise<
      ResultAsync<
        ZodiosResponseByAlias<Endpoints, K>,
        ZodiosMatchingErrorsByAlias<Endpoints, K>
      >
    >
  }
}

export const myApi = getApiWithReturnTypes()
