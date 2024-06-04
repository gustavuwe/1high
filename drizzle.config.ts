import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schemas/User.ts',
  out: './src/drizzle/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
