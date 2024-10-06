import { getZodError } from './getZodError'

export const getZodErrorMessage = (error: unknown): string | undefined => {
  const zodError = getZodError(error)
  return zodError?.message
}
