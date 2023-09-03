import { uuid, pgEnum, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { address } from './address';

export const langEnum = pgEnum('langs', ['pt_br', 'en_us']);

export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 125 }).notNull(),
  lastName: varchar('last_name', { length: 125 }).notNull(),
  socialName: varchar('social_name', { length: 255 }),
  lang: langEnum('lang').default('pt_br'),
  photoUrl: varchar('photo_url', { length: 255 }).notNull(),
  addressId: uuid('address_id').references(() => address.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});