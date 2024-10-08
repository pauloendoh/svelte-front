import { isErrorFromAlias } from '@zodios/core'
import type {
  Aliases,
  ZodiosMatchingErrorsByAlias,
} from '@zodios/core/lib/zodios.types'
import { endpoints } from '../../../generated/api'

type Endpoints = typeof endpoints

export function isApiError<
  Api extends Endpoints,
  Alias extends Aliases<Endpoints>,
>(alias: Alias, err: unknown): err is ZodiosMatchingErrorsByAlias<Api, Alias> {
  if (isErrorFromAlias(endpoints, alias as any, err)) {
    return true
  }
  return false
}
