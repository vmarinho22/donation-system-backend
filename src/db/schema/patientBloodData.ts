import { uuid, pgTable, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { patients } from './patients';

export const factorRh = pgEnum('factor_rh', ['+', '-']);

export const patientBloodData = pgTable('patient_blood_data', {
  id: uuid('id').defaultRandom().primaryKey(),
  factor_rh: factorRh('factor_rh').notNull(),
  patientId: uuid('patient_id').references(() => patients.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});