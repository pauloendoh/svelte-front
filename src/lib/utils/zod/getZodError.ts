import {
  fromError,
  isZodErrorLike,
  ValidationError,
} from 'zod-validation-error'

export const getZodError = (error: unknown): ValidationError | undefined => {
  if (isZodErrorLike(error)) {
    return fromError(error)
  }

  return undefined
}
