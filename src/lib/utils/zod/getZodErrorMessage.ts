import { ZodError } from 'zod'
import { fromZodError, isZodErrorLike } from 'zod-validation-error'

// if input is known to be zodError, return string; otherwise, string | undefined
export function getZodErrorMessage<T>(
  error: T,
): T extends ZodError ? string : string | undefined {
  try {
    if (error instanceof Error === false) {
      Object.setPrototypeOf(error, Error.prototype)
      // @ts-expect-error: https://github.com/causaly/zod-validation-error/blob/main/lib/fromZodError.ts#L43
      error.errors = error.issues
    }

    if (isZodErrorLike(error)) {
      const x = fromZodError(error)
      return x.message
    }

    return undefined as T extends ZodError ? string : string | undefined
  } catch (err) {
    console.log(err)
    return undefined as T extends ZodError ? string : string | undefined
  }
}
