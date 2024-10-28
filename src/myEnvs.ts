import * as envs from '$env/static/public'
import { z } from 'zod'

const envSchema = z.object({
  PUBLIC_API_URL: z.string().url(),
})

export const myEnvs = envSchema.parse(envs)
