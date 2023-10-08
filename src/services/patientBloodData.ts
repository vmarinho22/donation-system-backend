import { z } from "zod";
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";
import { patientBloodData } from "../db/schema/patientBloodData";

const patientBloodDataSchema = createSelectSchema(patientBloodData);

export type PatientBloodData = z.infer<typeof patientBloodDataSchema>;

export type CreatePatientBloodDataDto = Omit<PatientBloodData, "id" | "createdAt" | "updatedAt">;

async function create(createPatientBloodDataDto: CreatePatientBloodDataDto): Promise<string | null> {

  const parsedNurse = createInsertSchema(patientBloodData).parse(createPatientBloodDataDto);

  const createdPatientBloodData = await dbClient.insert(patientBloodData).values(parsedNurse).returning({ id: patientBloodData.id });

  if (createdPatientBloodData.length === 0) return null;

  return createdPatientBloodData[0].id;
}

async function getUnique(id: string): Promise<PatientBloodData | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientBloodData = await dbClient.select().from(patientBloodData).where(eq(patientBloodData.id, parsedId));

  if (returnedPatientBloodData.length === 0) return null;

  return returnedPatientBloodData[0];
}

async function getAll(): Promise<PatientBloodData[]> {
  const returnedPatientBloodData = await dbClient.select().from(patientBloodData);

  return returnedPatientBloodData;
}

async function getByPatientId(userId: string): Promise<PatientBloodData[] | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedPatientBloodData = await dbClient.select().from(patientBloodData).where(eq(patientBloodData.patientId, parsedId));

  if (returnedPatientBloodData.length === 0) return null;

  return returnedPatientBloodData;
}

async function update(id: string, updateNurseDto: Partial<PatientBloodData>): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientBloodData = await getUnique(parsedId);

  if (returnedPatientBloodData === null) return null;

  const parsedPatientBloodData = createSelectSchema(patientBloodData).partial().parse(updateNurseDto);

  const updatedPatientBloodData = await dbClient.update(patientBloodData).set(parsedPatientBloodData).where(eq(patientBloodData.id, returnedPatientBloodData.id)).returning({ id: patientBloodData.id });

  if (updatedPatientBloodData.length === 0) return null;

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getByPatientId,
  update
}