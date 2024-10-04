import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  API_URL: z.string().url()
})

export const myEnvs = envSchema.parse(process.env)