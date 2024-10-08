import type { z } from 'zod'
import type { signUpHeader } from '../../../../orval/auth/auth.zod'

export type SignUpHeader = z.infer<typeof signUpHeader>
