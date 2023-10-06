import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const doctors = pgTable('doctors', {
  id: uuid('id').defaultRandom().primaryKey(),
  specialty: varchar('specialty', { length: 255 }).notNull(),
  registrationNumber: varchar('registration_number', { length: 255 }).notNull(),
  subspecialties: varchar('subspecialties', { length: 255 }),
  emergencyTelContact: varchar('emergency_tel_contact', { length: 255 }).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});