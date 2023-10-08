import { z } from "zod";
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { patientBloodDonations } from "../db/schema/patientBloodDonations";
import { eq } from "drizzle-orm";

const patientBloodDonationsSchema = createSelectSchema(patientBloodDonations);

export type PatientBloodDonation = z.infer<typeof patientBloodDonationsSchema>;

export type CreatePatientBloodDonationDto = Omit<PatientBloodDonation, "id" | "createdAt" | "updatedAt">;

async function create(createPatientBloodDonationDto: CreatePatientBloodDonationDto): Promise<string | null> {

  const parsedPatientBloodDonation = createInsertSchema(patientBloodDonations, {
    date: z.string().or(z.date()).transform(arg => new Date(arg))
  }).parse(createPatientBloodDonationDto);

  const createdPatientBloodDonation = await dbClient.insert(patientBloodDonations).values(parsedPatientBloodDonation).returning({ id: patientBloodDonations.id });

  if (createdPatientBloodDonation.length === 0) return null;

  return createdPatientBloodDonation[0].id;
}

async function getUnique(id: string): Promise<PatientBloodDonation | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientBloodDonation = await dbClient.select().from(patientBloodDonations).where(eq(patientBloodDonations.id, parsedId));

  if (returnedPatientBloodDonation.length === 0) return null;

  return returnedPatientBloodDonation[0];
}

async function getAll(): Promise<PatientBloodDonation[]> {
  const returnedPatientBloodDonation = await dbClient.select().from(patientBloodDonations);

  return returnedPatientBloodDonation;
}

async function getByPatientId(userId: string): Promise<PatientBloodDonation[] | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedPatientBloodDonation = await dbClient.select().from(patientBloodDonations).where(eq(patientBloodDonations.patientId, parsedId));

  if (returnedPatientBloodDonation.length === 0) return null;

  return returnedPatientBloodDonation;
}

async function update(id: string, updatePatientBloodDonationDto: Partial<PatientBloodDonation>): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedPatientBloodDonation = await getUnique(parsedId);

  if (returnedPatientBloodDonation === null) return null;

  const parsedPatientBloodDonation = createSelectSchema(patientBloodDonations).partial().parse(updatePatientBloodDonationDto);

  const updatedPatientBloodDonation = await dbClient.update(patientBloodDonations).set(parsedPatientBloodDonation).where(eq(patientBloodDonations.id, returnedPatientBloodDonation.id)).returning({ id: patientBloodDonations.id });

  if (updatedPatientBloodDonation.length === 0) return null;

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getByPatientId,
  update
}