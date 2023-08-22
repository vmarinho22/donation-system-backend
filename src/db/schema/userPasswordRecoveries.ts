import { uuid, pgTable, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const userPasswordRecovery = pgTable('user_password_recoveries', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: integer('code').notNull(),
  validate: timestamp("validate"),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});