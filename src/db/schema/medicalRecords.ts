import { uuid, pgTable, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const medicalRecords = pgTable('medical_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  hasChronicDiseases: boolean('has_chronic_diseases').default(false),
  chronicDiseases: varchar('chronic_diseases', { length: 255 }),
  hasMedicalConditions: boolean('has_medical_conditions').default(false),
  medicalConditions: varchar('medical_conditions', { length: 255 }),
  hasPreviousSurgeries: boolean('has_previous_surgeries').default(false),
  previousSurgeries: varchar('previous_surgeries', { length: 255 }),
  hasBloodBorneDiseases: boolean('has_blood_borne_diseases').default(false),
  hasCommunicableDiseases: boolean('has_communicable_diseases').default(false),
  communicableDiseases: varchar('communicable_diseases', { length: 255 }),
  hasIst: boolean('has_ist').default(false),
  ist: varchar('ist', { length: 255 }),
  useIllicitDrugs: boolean('use_illicit_drugs').default(false),
  useInjectingDrugs: boolean('use_injecting_drugs').default(false),
  hasPracticeUnprotectedSex: boolean('has_practice_unprotected_sex').default(false),
  hadPregnancy: boolean('had_pregnancy').default(false),
  recentlyBreastfed: boolean('recently_breastfed').default(false),
  lastBreastfeeding: timestamp('last_breastfeeding'),
  notes: varchar('notes', { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});