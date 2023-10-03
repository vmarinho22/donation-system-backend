import { z } from "zod";
import dbClient from '../clients/db';
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { patientMedicaments } from "../db/schema/patientMedicaments";

const patientMedicamentSchema = createSelectSchema(patientMedicaments, {
  start_date: z.string().or(z.date()).transform(arg => new Date(arg)),
  end_date: z.string().or(z.date()).transform(arg => new Date(arg)).nullable()
});

export type PatientMedicament = z.infer<typeof patientMedicamentSchema>;

export type CreatePatientMedicamentDto = Omit<PatientMedicament, "id" | "createdAt" | "updatedAt">; 

async function create(createPatientDto: CreatePatientMedicamentDto): Promise<string | null> {

  const parsedPatientMedicament = createInsertSchema(patientMedicaments, {
    start_date: z.string().or(z.date()).transform(arg => new Date(arg)),
    end_date: z.string().or(z.date()).transform(arg => new Date(arg)).nullable()
  }).parse(createPatientDto);

  const createdPatientMedicament = await dbClient.insert(patientMedicaments).values(parsedPatientMedicament).returning({ id: patientMedicaments.id });

  if (createdPatientMedicament.length === 0) return null;

  return createdPatientMedicament[0].id;
}

async function getUnique(id: string): Promise<PatientMedicament | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientMedicament = await dbClient.select().from(patientMedicaments).where(eq(patientMedicaments.id, parsedId));

  if (returnedPatientMedicament.length === 0) return null;

  return returnedPatientMedicament[0];
}

async function getAll(): Promise<PatientMedicament[]> {
  const returnedPatientMedicaments = await dbClient.select().from(patientMedicaments);

  return returnedPatientMedicaments;
}

async function getUniqueByPatientId(userId: string): Promise<PatientMedicament | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedPatientMedicament = await dbClient.select().from(patientMedicaments).where(eq(patientMedicaments.patientId, parsedId));

  if (returnedPatientMedicament.length === 0) return null;

  return returnedPatientMedicament[0];
}

async function update(id: string, profile: Partial<PatientMedicament>): Promise<boolean | null> {
  const returnedPatientMedicament = await getUnique(id);

  if (returnedPatientMedicament === null) return null;

  const partialPatientMedicament = patientMedicamentSchema.partial().parse(profile);

  await dbClient.update(patientMedicaments).set(partialPatientMedicament).where(eq(patientMedicaments.id, returnedPatientMedicament.id));

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getUniqueByPatientId,
  update
}