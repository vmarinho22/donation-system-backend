import { uuid, pgTable, timestamp, varchar, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

export const doctors = pgTable('doctors', {
  id: uuid('id').defaultRandom().primaryKey(),
  specialty: varchar('specialty', { length: 255 }).notNull(),
  registrationNumber: varchar('registration_number', { length: 255 }).notNull(),
  subspecialties: varchar('subspecialties', { length: 255 }),
  emergencyTelContact: varchar('emergency_tel_contact', { length: 255 }).notNull(),
  disabled: boolean('disabled').default(false),
  disabledAt: timestamp('disabled_at'),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});