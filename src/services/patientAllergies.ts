
import { z } from 'zod';
import dbClient from '../clients/db';
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { patientAllergies } from "../db/schema/patientAllergies";

const patientAllergiesSchema = createSelectSchema(patientAllergies);

export type PatientAllergy = z.infer<typeof patientAllergiesSchema>;

export type CreatePatientMedicamentDto = Omit<PatientAllergy, "id" | "createdAt" | "updatedAt">;

async function create(createPatientDto: CreatePatientMedicamentDto): Promise<string | null> {

  const parsedPatientAllergy = createInsertSchema(patientAllergies).parse(createPatientDto);

  const createdPatientAllergy = await dbClient.insert(patientAllergies).values(parsedPatientAllergy).returning({ id: patientAllergies.id });

  if (createdPatientAllergy.length === 0) return null;

  return createdPatientAllergy[0].id;
}

async function getUnique(id: string): Promise<PatientAllergy | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientAllergy = await dbClient.select().from(patientAllergies).where(eq(patientAllergies.id, parsedId));

  if (returnedPatientAllergy.length === 0) return null;

  return returnedPatientAllergy[0];
}

async function getAll(): Promise<PatientAllergy[]> {
  const returnedPatientAllergies = await dbClient.select().from(patientAllergies);

  return returnedPatientAllergies;
}

async function getUniqueByPatientId(userId: string): Promise<PatientAllergy | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedPatientAllergy = await dbClient.select().from(patientAllergies).where(eq(patientAllergies.patientId, parsedId));

  if (returnedPatientAllergy.length === 0) return null;

  return returnedPatientAllergy[0];
}

async function update(id: string, profile: Partial<PatientAllergy>): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientAllergy = await getUnique(parsedId);

  if (returnedPatientAllergy === null) return null;

  const parsedPatientAllergy = patientAllergiesSchema.partial().parse(profile);

  const updatedPatientAllergy = await dbClient.update(patientAllergies).set(parsedPatientAllergy).where(eq(patientAllergies.id, returnedPatientAllergy.id));

  if (updatedPatientAllergy.length === 0) return null;

  return true;
}

async function remove(id: string): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const deletedPatientAllergy = await dbClient.delete(patientAllergies).where(eq(patientAllergies.id, parsedId));

  if (deletedPatientAllergy.length === 0) return null;

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getUniqueByPatientId,
  update,
  remove
};