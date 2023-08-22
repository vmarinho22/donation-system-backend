import { uuid, pgTable, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

export const historyInfectiousDiseases = pgTable('history_infectious_diseases', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  date: timestamp('date').notNull(),
  periods: varchar('periods', { length: 255 }).notNull(),
  treatmentReceived: varchar('treatment_received', { length: 255 }).notNull(),
  results: varchar('results', { length: 255 }).notNull(),
  didScreeningExams: varchar('did_screening_exams', { length: 255 }).notNull(),
  screeningExams: varchar('screening_exams', { length: 255 }),
  screeningExamsDate: varchar('screening_exams_date', { length: 255 }),
  wasPublicHealthNotices: boolean('was_public_health_notices').notNull(),
  riskBehaviors: varchar('risk_behaviors', { length: 255 }),
  anyRecentTravel: boolean('any_recent_travel'),
  userId: uuid('user_id').references(() => users.id).notNull(),
  currentIllnessesSymptoms: boolean('current_illnesses_symptoms'),
  notes: varchar('notes', { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});