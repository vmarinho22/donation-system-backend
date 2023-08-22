import { uuid, pgTable, timestamp, integer, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const medicamentStripe = pgEnum('medicament_stripe', ['no_stripe', 'yellow', 'red', 'black']);

export const userMedicaments = pgTable('user_medicaments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  stripe: medicamentStripe('stripe').default('no_stripe'),
  frequency: varchar('frequency', { length: 255 }).notNull(),
  dosage: integer('dosage').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});