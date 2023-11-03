import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { donationPreRating } from "../db/schema/donationPreRating";
import { z } from "zod";
import dbClient from "../clients/db";
import { eq } from "drizzle-orm";

const donationPreRatingSchema = createSelectSchema(donationPreRating, {
  doctorName: z.string().optional(),
  doctorRegistrationNumber: z.string().optional(),
  doctorId: z.string().uuid().optional(),
});

export type DonationPreRating = z.infer<typeof donationPreRatingSchema>;

export type CreateDonationPreRatingDto = Omit<
DonationPreRating,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
>;

async function create(
  createDonationPreRatingDto: CreateDonationPreRatingDto,
): Promise<string | null> {
  const parsedDonationPreRating = createInsertSchema(donationPreRating).parse(createDonationPreRatingDto);

  const createdDonationPreRating = await dbClient
    .insert(donationPreRating)
    .values(parsedDonationPreRating)
    .returning({ id: donationPreRating.id });

  if (createdDonationPreRating.length === 0) return null;

  return createdDonationPreRating[0].id;
}

async function getUnique(id: string): Promise<DonationPreRating | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedDonationPreRating = await dbClient.select().from(donationPreRating).where(eq(donationPreRating.id, parsedId));

  if (returnedDonationPreRating.length === 0) return null;

  return returnedDonationPreRating[0];
}

async function getAll(): Promise<DonationPreRating[]> {
  const returnedDonationPreRatings = await dbClient.select().from(donationPreRating);

  return returnedDonationPreRatings;
}

async function getUniqueByDoctorId(userId: string): Promise<DonationPreRating | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedDonationPreRating = await dbClient.select().from(donationPreRating).where(eq(donationPreRating.doctorId, parsedId));

  if (returnedDonationPreRating.length === 0) return null;

  return returnedDonationPreRating[0];
}

async function update(id: string, updatePatientAllergyDto: Partial<DonationPreRating>): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedDonationPreRating = await getUnique(parsedId);

  if (returnedDonationPreRating === null) return null;

  const parsedPatientAllergy = donationPreRatingSchema.partial().parse(updatePatientAllergyDto);

  const updatedDonationPreRating = await dbClient.update(donationPreRating).set(parsedPatientAllergy).where(eq(donationPreRating.id, returnedDonationPreRating.id)).returning({ id: donationPreRating.id });

  if (updatedDonationPreRating.length === 0) return null;

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getUniqueByDoctorId,
  update
}