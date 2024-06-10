import 'dotenv/config'
import { z } from 'zod'

const myShape = z.object({
  DATABASE_URL: z.coerce
    .string({ message: 'database url needs to be a string!' })
    .trim(),
  PORT: z.coerce
    .number()
    .min(1024)
    .max(6000)
    // .gte(1024, { message: 'number too low' } )
    // .lte(6000, { message: 'number too big' })
    .nonnegative({ message: 'negative-number not allowed' }),
  POSTGRES_USER: z.coerce
    .string()
    .trim()
    .max(255, { message: 'username too big' }),
  POSTGRES_PASSWORD: z.coerce
    .string()
    .trim()
    .max(255, { message: 'password too big' }),
  POSTGRES_DB: z.coerce
    .string()
    .trim()
    .max(50, { message: 'database name too big' }),
})

const parsedEnv = myShape.safeParse(process.env)

if (!parsedEnv.success) {
  console.log('Got an error during parse of environment variables with zod!')
  console.error(parsedEnv.error.errors)
  process.exit(1)
}

export const env = parsedEnv.data
