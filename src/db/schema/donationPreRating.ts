import { uuid, pgEnum, pgTable, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';
import { doctors } from './doctors';
import { patients } from './patients';

export const donationTypeEnum = pgEnum('donation_type', ['blood', 'milk']);

export const preDonationStatusEnum = pgEnum('pre_donation_status', ['starting', 'in_progress', 'finished']);

export const donationPreRating = pgTable('pre_donation_rating', {
  id: uuid('id').defaultRandom().primaryKey(),
  status: preDonationStatusEnum('status').notNull(),
  isEligibility: boolean('is_eligibility').notNull(),
  performedNecessaryTests: boolean('performed_necessary_tests').notNull(),
  testNotes: varchar('test_notes', { length: 255 }).notNull(),
  fullTestLink: varchar('full_test_link', { length: 255 }).notNull(),
  type: donationTypeEnum('type').notNull(),
  approved: boolean('approved').notNull(),
  doctorName: varchar('doctor_name', { length: 255 }),
  doctorRegistrationNumber: varchar('doctor_registration_number', { length: 255 }),
  doctorId: uuid('doctor_id').references(() => doctors.id),
  patientId: uuid('patient_id').references(() => patients.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});