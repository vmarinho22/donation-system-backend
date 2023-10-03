import { uuid, pgEnum, pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { patients } from './patients';

export const medicamentStripe = pgEnum('medicament_stripe', ['no_stripe', 'yellow', 'red', 'black']);

export const patientMedicaments = pgTable('patient_medicaments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  stripe: medicamentStripe('stripe').default('no_stripe'),
  frequency: varchar('frequency', { length: 255 }).notNull(),
  dosage: integer('dosage').notNull(),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date'),
  patientId: uuid('patient_id').references(() => patients.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});