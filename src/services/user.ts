import { users } from "../db/schema/users";
import dbClient from '../clients/db';
import { z } from "zod";
import { eq } from "drizzle-orm";
import { Roles } from "../types/roles";

type User = {
  id: string;
  email: string;
  role: Roles | null;
  lastLogin: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

async function getUnique(id: string): Promise<User | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedUser = await dbClient.select({
    id: users.id,
    email: users.email,
    role: users.role,
    lastLogin: users.lastLogin,
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
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
  }).from(users);

  return returnedUsers;
}

export default {
  getUnique,
  getAll
}