import { uuid, pgEnum, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const bloodType = pgEnum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

export const factorRh = pgEnum('factor_rh', ['+', '-']);

export const bloods = pgTable('bloods', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: bloodType('type').notNull(),
  factor_rh: factorRh('factor_rh').notNull(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});