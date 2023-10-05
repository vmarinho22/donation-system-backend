import { uuid, pgEnum, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { patients } from './patients';

export const intensityAllergic = pgEnum('intensity_allergic', ['low', 'medium', 'hight']);

export const patientAllergies = pgTable('patient_allergies', {
  id: uuid('id').defaultRandom().primaryKey(),
  causative: varchar('causative', { length: 255 }).notNull(),
  intensity: intensityAllergic('intensity').default('low'),
  patientId: uuid('patient_id').references(() => patients.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});