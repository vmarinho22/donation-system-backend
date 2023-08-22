import { uuid, pgEnum, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';
import { medicalRecords } from './medicalRecords';
import { bloods } from './bloods';

export const rolesEnum = pgEnum('roles', ['user', 'admin', 'entity', 'doctor']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: rolesEnum('role').default('user'),
  profileId: uuid('profile_id').references(() => profiles.id).notNull(),
  medicalRecordId: uuid('medical_record_id').references(() => medicalRecords.id).notNull(),
  bloodDataId: uuid('blood_data_id').references(() => bloods.id).notNull(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});