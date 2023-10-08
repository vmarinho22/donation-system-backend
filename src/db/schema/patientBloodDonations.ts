import { uuid, pgTable, varchar, timestamp, real } from 'drizzle-orm/pg-core';
import { patients } from './patients';
import { doctors } from './doctors';
import { nurses } from './nurses';

export const patientBloodDonations = pgTable('patient_blood_donations', {
  id: uuid('id').defaultRandom().primaryKey(),
  bagIdentifier: varchar('bag_identifier', { length: 255 }).notNull(),
  date: timestamp('date').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  reason: varchar('reason', { length: 255 }).notNull(),
  typeTransfusedBloodComponent: varchar('type_transfused_blood_component', { length: 255 }).notNull(),
  donatedComponent: varchar('donated_component', { length: 255 }).notNull(),
  bagQuantity: real('bag_quantity').notNull(),
  finality: varchar('finality', { length: 255 }).notNull(),
  results: varchar('results', { length: 255 }).notNull(),
  reactions: varchar('reactions', { length: 255 }),
  notes: varchar('notes', { length: 255 }),
  patientId: uuid('patient_id').references(() => patients.id).notNull(),
  doctorId: uuid('doctor_id').references(() => doctors.id).notNull(),
  nurseId: uuid('nurse_id').references(() => nurses.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});