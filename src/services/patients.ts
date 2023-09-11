import { z } from "zod";
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { patients } from "../db/schema/patients";

const patientSchema = createSelectSchema(patients, {
  birthDate: z.string().or(z.date()).transform(arg => new Date(arg))
});

export type Patient = z.infer<typeof patientSchema>;

export type CreatePatientDto = Omit<Patient, "id" | "createdAt" | "updatedAt">;

async function create(createPatientDto: CreatePatientDto): Promise<string | null> {
  const insertPatientSchema = createInsertSchema(patients, {
    birthDate: z.string().or(z.date()).transform(arg => new Date(arg))
  });

  const parsedPatient = insertPatientSchema.parse(createPatientDto);

  const createdPatient = await dbClient.insert(patients).values(parsedPatient).returning({ id: patients.id });

  if (createdPatient.length === 0) return null;

  return createdPatient[0].id;
}

async function getUnique(id: string): Promise<Patient | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatient = await dbClient.select().from(patients).where(eq(patients.id, parsedId));

  if (returnedPatient.length === 0) return null;

  return returnedPatient[0];
}

async function getAll(): Promise<Patient[]> {
  const returnedPatients = await dbClient.select().from(patients);

  return returnedPatients;
}

async function update(id: string, profile: Partial<Patient>): Promise<boolean | null> {
  const returnedPatient = await getUnique(id);

  if (returnedPatient === null) return null;

  const partialPatient = patientSchema.partial().parse(profile);

  await dbClient.update(patients).set(partialPatient).where(eq(patients.id, returnedPatient.id));

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  update
}