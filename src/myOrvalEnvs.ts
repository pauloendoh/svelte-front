import { config } from 'dotenv'
import { z } from 'zod'
config()

const envSchema = z.object({
  PUBLIC_API_URL: z.string().url(),
})

export const myOrvalEnvs = envSchema.parse(process.env)
