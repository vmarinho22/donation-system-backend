import { uuid, pgTable, timestamp, varchar, real } from 'drizzle-orm/pg-core';
import { users } from './users';

export const userTransfusionHistory = pgTable('user_transfusion_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  date: timestamp("date").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  reason: varchar("reason", { length: 255 }).notNull(),
  typeTransfusedBloodComponent: varchar("type_transfused_blood_component", { length: 255 }).notNull(),
  quantity: real('quantity').notNull(),
  results: varchar("results", { length: 255 }).notNull(),
  reactions: varchar("reactions", { length: 255 }),
  doctorResponsible: varchar("doctor_responsible", { length: 255 }).notNull(),
  referenceContact: varchar("reference_contact", { length: 255 }).notNull(),
  notes: varchar('notes', { length: 255 }),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});