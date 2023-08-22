import { uuid, pgTable, timestamp, varchar, real } from 'drizzle-orm/pg-core';
import { users } from './users';

export const bloodDonation = pgTable('blood_donations', {
  id: uuid('id').defaultRandom().primaryKey(),
  location: varchar('location', { length: 255 }).notNull(),
  donatedComponent: varchar('donated_component', { length: 255 }).notNull(),
  quantity: real('quantity').notNull(),
  finality: varchar('finality', { length: 255 }).notNull(),
  results: varchar('results', { length: 255 }).notNull(),
  reactions: varchar('results', { length: 255 }),
  notes: varchar('notes', { length: 255 }),
  userId: uuid('user_id').references(() => users.id).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});