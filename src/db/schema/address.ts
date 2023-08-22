import { uuid, pgTable, varchar, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const address = pgTable('address', {
  id: uuid('id').defaultRandom().primaryKey(),
  postalCode: integer('postal_code').notNull(),
  street: varchar('street', { length: 255 }).notNull(),
  number: integer('number').notNull(),
  noNumber: boolean('no_number').default(false),
  complement: varchar('complement', { length: 255 }),
  district: varchar('district', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  country: varchar('country', { length: 255 }).notNull(),
  uf: varchar('uf', { length: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});