import { uuid, pgEnum, pgTable, varchar, timestamp, integer, real } from 'drizzle-orm/pg-core';
import { address } from './address';

export const langEnum = pgEnum('langs', ['pt_br', 'en_us']);

export const sexEnum = pgEnum('sex', ['man', 'woman', 'other']);

export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 125 }).notNull(),
  lastName: varchar('last_name', { length: 125 }).notNull(),
  socialName: varchar('social_name', { length: 255 }),
  lang: langEnum('lang').default('pt_br'),
  photoUrl: varchar('photo_url', { length: 255 }).notNull(),
  birthDate: timestamp("birth_date").notNull(),
  cpf: varchar('cpf', { length: 11 }).notNull(),
  rg: varchar('rg', { length: 9 }).notNull(),
  phone: varchar('phone', { length: 14 }).notNull(),
  tel: varchar('tel', { length: 14 }),
  sex: sexEnum('sex'),
  gender: varchar('gender', { length: 125 }).notNull(),
  age: integer('age').notNull(),
  height: real('height').notNull(),
  weight: real('weight').notNull(),
  // TODO: add relations
  addressId: uuid('address_id').references(() => address.id).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});