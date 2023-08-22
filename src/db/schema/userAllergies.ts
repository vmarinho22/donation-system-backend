import { uuid, pgTable, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const intensityAllergies = pgEnum('intensity_allergies', ['low', 'medium', 'hight']);

export const userAllergies = pgTable('user_allergies', {
  id: uuid('id').defaultRandom().primaryKey(),
  causative: varchar('causative', { length: 255 }).notNull(),
  intensity: intensityAllergies('intensity').default('low'),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});