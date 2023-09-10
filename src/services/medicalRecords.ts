import { z } from "zod";
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { medicalRecords } from "../db/schema/medicalRecords";

const medicalRecordsSchema = createSelectSchema(medicalRecords);

export type MedicalRecord = z.infer<typeof medicalRecordsSchema>;

export type CreateMedicalRecordDto = Omit<MedicalRecord, "id" | "createdAt" | "updatedAt">;

async function create(createMedicalRecordDto: CreateMedicalRecordDto): Promise<string | null> {
    const insertUserSchema = createInsertSchema(medicalRecords);

    const parsedMedicalRecord = insertUserSchema.parse(createMedicalRecordDto);

    const createdMedicalRecord = await dbClient.insert(medicalRecords).values(parsedMedicalRecord).returning({ id: medicalRecords.id });

    if (createdMedicalRecord.length === 0) {
        throw new Error("Could not create medical record");
    }

    return createdMedicalRecord[0].id;
}

export default {
    create,
}