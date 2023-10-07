import { z } from "zod";
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { patientTransfusionHistory } from "../db/schema/patientTransfusionHistory";
import { eq } from "drizzle-orm";

const patientTransfusionHistorySchema = createSelectSchema(patientTransfusionHistory);

export type PatientTransfusionHistory = z.infer<typeof patientTransfusionHistorySchema>;

export type CreatePatientTransfusionHistoryDto = Omit<PatientTransfusionHistory, "id" | "createdAt" | "updatedAt">;

async function create(createPatientTransfusionHistoryDto: CreatePatientTransfusionHistoryDto): Promise<string | null> {

  const parsedPatientTransfusionHistory = createInsertSchema(patientTransfusionHistory, {
    date: z.string().or(z.date()).transform(arg => new Date(arg))
  }).parse(createPatientTransfusionHistoryDto);

  const createdPatientTransfusionHistory = await dbClient.insert(patientTransfusionHistory).values(parsedPatientTransfusionHistory).returning({ id: patientTransfusionHistory.id });

  if (createdPatientTransfusionHistory.length === 0) return null;

  return createdPatientTransfusionHistory[0].id;
}

async function getUnique(id: string): Promise<PatientTransfusionHistory | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientTransfusionHistory = await dbClient.select().from(patientTransfusionHistory).where(eq(patientTransfusionHistory.id, parsedId));

  if (returnedPatientTransfusionHistory.length === 0) return null;

  return returnedPatientTransfusionHistory[0];
}

async function getAll(): Promise<PatientTransfusionHistory[]> {
  const returnedPatientTransfusionHistory = await dbClient.select().from(patientTransfusionHistory);

  return returnedPatientTransfusionHistory;
}

async function getUniqueByPatientId(userId: string): Promise<PatientTransfusionHistory | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedPatientTransfusionHistory = await dbClient.select().from(patientTransfusionHistory).where(eq(patientTransfusionHistory.patientId, parsedId));

  if (returnedPatientTransfusionHistory.length === 0) return null;

  return returnedPatientTransfusionHistory[0];
}

async function update(id: string, updateDoctorDto: Partial<PatientTransfusionHistory>): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientTransfusionHistory = await getUnique(parsedId);

  if (returnedPatientTransfusionHistory === null) return null;

  const parsedPatientTransfusionHistory = createSelectSchema(patientTransfusionHistory).partial().parse(updateDoctorDto);

  const updatedPatientTransfusionHistory = await dbClient.update(patientTransfusionHistory).set(parsedPatientTransfusionHistory).where(eq(patientTransfusionHistory.id, returnedPatientTransfusionHistory.id)).returning({ id: patientTransfusionHistory.id });

  if (updatedPatientTransfusionHistory.length === 0) return null;

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getUniqueByPatientId,
  update
}