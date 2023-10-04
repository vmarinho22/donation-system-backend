import { uuid, pgTable, timestamp, varchar, real, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const factorRh = pgEnum('factor_rh', ['+', '-']);

export const bloodDonation = pgTable('blood_donations', {
  id: uuid('id').defaultRandom().primaryKey(),
  location: varchar('location', { length: 255 }).notNull(),
  donatedComponent: varchar('donated_component', { length: 255 }).notNull(),
  quantity: real('quantity').notNull(),
  finality: varchar('finality', { length: 255 }).notNull(),
  results: varchar('results', { length: 255 }).notNull(),
  reactions: varchar('results', { length: 255 }),
  factor_rh: factorRh('factor_rh').notNull(),
  notes: varchar('notes', { length: 255 }),
  userId: uuid('user_id').references(() => users.id).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});