// import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
// import postgres from 'postgres';
import { pgTable, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core'

export const UserTable = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  email: text('email').unique().notNull(),
  password: varchar('password').notNull(),
  // role: text("role").$type<"admin" | "customer">(),
  // createdAt: timestamp('created_at'),
})
