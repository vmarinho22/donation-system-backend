import { users } from "../db/schema/users";
import dbClient from '../clients/db';
import { z } from "zod";
import { eq } from "drizzle-orm";

const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["patient", "admin", "entity", "doctor", "nurse"]).nullable(),
  lastLogin: z.date().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type User = z.infer<typeof userSchema>;

async function getUnique(id: string): Promise<User | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedUser = await dbClient.select({
    id: users.id,
    email: users.email,
    role: users.role,
    lastLogin: users.lastLogin,
    profileId: users.profileId,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  }).from(users).where(eq(users.id, parsedId));

  if (returnedUser.length === 0) return null;

  return returnedUser[0];
}

async function getAll(): Promise<User[]> {
  const returnedUsers = await dbClient.select({
    id: users.id,
    email: users.email,
    role: users.role,
    lastLogin: users.lastLogin,
    profileId: users.profileId,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  }).from(users);

  return returnedUsers;
}

async function update(id: string, user: Partial<User>): Promise<boolean | null> {
  const parsedId = z.string().uuid().parse(id);

  const returnedUser = await dbClient.select({ id: users.id }).from(users).where(eq(users.id, parsedId));

  if (returnedUser.length === 0) return null;

  const partialUser = userSchema.partial().parse(user);

  await dbClient.update(users).set(partialUser).where(eq(users.id, parsedId));

  return true;
}

export default {
  getUnique,
  getAll,
  update
}