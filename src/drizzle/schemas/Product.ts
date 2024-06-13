// import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
// import postgres from 'postgres';
import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  real,
  integer,
  boolean,
  json,
} from 'drizzle-orm/pg-core'

export const ProductTable = pgTable('product', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  slug: text('slug').unique().notNull(),
  category: varchar('category').notNull(),
  brand: varchar('brand').notNull(),
  price: real('price').notNull(),
  description: text('description').notNull(),
  rating: real('rating'),
  numReviews: integer('numReviews'),
  stock: integer('stock').notNull(),
  isFeatured: boolean('isFeatured').notNull(), // Booleano para indicar se é destacado
  images: text('images').array().notNull(),
  banner: text('banner').notNull(),
  weight: integer('weight').notNull(),
  dimensions: json('dimensions').notNull(),
  warranty: varchar('warranty').notNull(), // garantia ex: 6 meses
  colorOptions: text('colorOptions').array().notNull(),
  features: text('features').array().notNull(),
  releaseDate: timestamp('release_date').defaultNow(),
  // role: text("role").$type<"admin" | "customer">(),
  // createdAt: timestamp('created_at'),
})
