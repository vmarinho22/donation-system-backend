import { z } from "zod";
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nurses } from "../db/schema/nurses";
import { eq } from "drizzle-orm";

const nursesSchema = createSelectSchema(nurses);

export type Nurse = z.infer<typeof nursesSchema>;

export type CreateNurseDto = Omit<Nurse, "id" | "subspecialties" | "disabled" | "disabledAt" | "createdAt" | "updatedAt">;

async function create(createDoctorDto: CreateNurseDto): Promise<string | null> {

  const parsedNurse = createInsertSchema(nurses).parse(createDoctorDto);

  const createdNurse = await dbClient.insert(nurses).values(parsedNurse).returning({ id: nurses.id });

  if (createdNurse.length === 0) return null;

  return createdNurse[0].id;
}

async function getUnique(id: string): Promise<Nurse | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedNurse = await dbClient.select().from(nurses).where(eq(nurses.id, parsedId));

  if (returnedNurse.length === 0) return null;

  return returnedNurse[0];
}

async function getAll(): Promise<Nurse[]> {
  const returnedNurses = await dbClient.select().from(nurses);

  return returnedNurses;
}

async function getUniqueByUserId(userId: string): Promise<Nurse | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedNurse = await dbClient.select().from(nurses).where(eq(nurses.userId, parsedId));

  if (returnedNurse.length === 0) return null;

  return returnedNurse[0];
}

async function update(id: string, updateNurseDto: Partial<Nurse>): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedNurse = await getUnique(parsedId);

  if (returnedNurse === null) return null;

  const parsedNurse = createSelectSchema(nurses).partial().parse(updateNurseDto);

  const updatedNurse = await dbClient.update(nurses).set(parsedNurse).where(eq(nurses.id, returnedNurse.id)).returning({ id: nurses.id });

  if (updatedNurse.length === 0) return null;

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getUniqueByUserId,
  update
}