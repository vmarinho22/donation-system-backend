import { z } from "zod";
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { medicalRecords } from "../db/schema/medicalRecords";
import { eq } from "drizzle-orm";

const medicalRecordsSchema = createSelectSchema(medicalRecords);

export type MedicalRecord = z.infer<typeof medicalRecordsSchema>;

export type CreateMedicalRecordDto = Omit<MedicalRecord, "id" | "createdAt" | "updatedAt">;

async function create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<string | null> {
  const insertUserSchema = createInsertSchema(medicalRecords);

  const parsedMedicalRecord = insertUserSchema.parse(createMedicalRecordDto);

  const createdMedicalRecord = await dbClient.insert(medicalRecords).values(parsedMedicalRecord).returning({ id: medicalRecords.id });

  if (createdMedicalRecord.length === 0) return null;

  return createdMedicalRecord[0].id;
}

async function getUnique(id: string): Promise<MedicalRecord | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedMedicalRecord = await dbClient.select().from(medicalRecords).where(eq(medicalRecords.id, parsedId));

  if (returnedMedicalRecord.length === 0) return null;

  return returnedMedicalRecord[0];
}

async function getAll(): Promise<MedicalRecord[]> {
  const returnedMedicalRecords = await dbClient.select().from(medicalRecords);

  return returnedMedicalRecords;
}

async function update(id: string, updateMedicalRecordDto: Partial<MedicalRecord>): Promise<boolean | null> {
  const returnedMedicalRecords = await getUnique(id);

  if (returnedMedicalRecords === null) return null;

  const partialMedicalRecords = medicalRecordsSchema.partial().parse(updateMedicalRecordDto);

  await dbClient.update(medicalRecords).set(partialMedicalRecords).where(eq(medicalRecords.id, returnedMedicalRecords.id));

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  update
}