import { uuid, pgEnum, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { profiles } from './profiles';

export const rolesEnum = pgEnum('roles', ['patient', 'admin', 'entity', 'doctor', 'nurse']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  cpf: varchar('cpf', { length: 11 }).notNull(),
  role: rolesEnum('role').default('patient'),
  lastLogin: timestamp('last_login').defaultNow(),
  profileId: uuid('profile_id').references(() => profiles.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});