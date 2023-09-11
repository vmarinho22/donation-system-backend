import { uuid, pgEnum, pgTable, varchar, timestamp, integer, doublePrecision } from 'drizzle-orm/pg-core';
import { users } from './users';
import { medicalRecords } from './medicalRecords';
import { bloods } from './bloods';

export const sexEnum = pgEnum('sex', ['man', 'woman', 'other']);

export const patients = pgTable('patients', {
  id: uuid('id').defaultRandom().primaryKey(),
  birthDate: timestamp('birth_date').notNull(),
  sex: sexEnum('sex').notNull(),
  gender: varchar('gender', { length: 255 }),
  age: integer('age').notNull(),
  weight: doublePrecision('weight').notNull(),
  height: integer('height').notNull(),
  rg: varchar('rg', { length: 10 }).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  medicalRecordId: uuid('medical_record_id').references(() => medicalRecords.id).notNull(),
  bloodId: uuid('blood_id').references(() => bloods.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});