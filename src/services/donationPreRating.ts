import { donationPreRating } from './../db/schema/donationPreRating';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import dbClient from '../clients/db';
import { eq } from 'drizzle-orm';
import { doctors } from './../db/schema/doctors';
import { users } from '../db/schema/users';
import { profiles } from '../db/schema/profiles';

const donationPreRatingSchema = createSelectSchema(donationPreRating, {
  doctorName: z.string().optional(),
  doctorRegistrationNumber: z.string().optional(),
  doctorId: z.string().uuid().optional(),
});

export type DonationPreRating = z.infer<typeof donationPreRatingSchema>;

export type CreateDonationPreRatingDto = Omit<
  DonationPreRating,
  'id' | 'createdAt' | 'updatedAt'
>;

type DonationPreRatingQuery = {
  donationPreRating: DonationPreRating;
  firstName: string | null;
  lastName: string | null;
  socialName: string | null;
  registrationNumber: string | null;
};

async function create(
  createDonationPreRatingDto: CreateDonationPreRatingDto,
): Promise<string | null> {
  const parsedDonationPreRating = createInsertSchema(donationPreRating).parse(
    createDonationPreRatingDto,
  );

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

  const returnedDonationPreRating = await dbClient
    .select({
      donationPreRating: donationPreRating,
      firstName: profiles.firstName,
      lastName: profiles.lastName,
      socialName: profiles.socialName,
      registrationNumber: doctors.registrationNumber,
    })
    .from(donationPreRating)
    .leftJoin(doctors, eq(donationPreRating.doctorId, doctors.id))
    .leftJoin(users, eq(doctors.userId, users.id))
    .leftJoin(profiles, eq(users.profileId, profiles.id))
    .where(eq(donationPreRating.id, parsedId));

  if (returnedDonationPreRating.length === 0) return null;

  return formatDonationPreRatingReturn(returnedDonationPreRating[0]);
}

async function getAll(): Promise<DonationPreRating[]> {
  const returnedDonationPreRatings = await dbClient
  .select({
    donationPreRating: donationPreRating,
    firstName: profiles.firstName,
    lastName: profiles.lastName,
    socialName: profiles.socialName,
    registrationNumber: doctors.registrationNumber,
  })
  .from(donationPreRating)
  .leftJoin(doctors, eq(donationPreRating.doctorId, doctors.id))
  .leftJoin(users, eq(doctors.userId, users.id))
  .leftJoin(profiles, eq(users.profileId, profiles.id))

  return returnedDonationPreRatings.map((data) => formatDonationPreRatingReturn(data));
}

async function getAllByPatientId(
  patientId: string,
): Promise<DonationPreRating[]> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(patientId);

  const returnedDonationPreRatings: DonationPreRatingQuery[] = await dbClient
    .select({
      donationPreRating: donationPreRating,
      firstName: profiles.firstName,
      lastName: profiles.lastName,
      socialName: profiles.socialName,
      registrationNumber: doctors.registrationNumber,
    })
    .from(donationPreRating)
    .leftJoin(doctors, eq(donationPreRating.doctorId, doctors.id))
    .leftJoin(users, eq(doctors.userId, users.id))
    .leftJoin(profiles, eq(users.profileId, profiles.id))
    .where(eq(donationPreRating.patientId, parsedId));

  const formattedDonationPreRatings = returnedDonationPreRatings.map((data) => formatDonationPreRatingReturn(data));

  return formattedDonationPreRatings;
}

async function getAllByDoctorId(
  patientId: string,
): Promise<DonationPreRating[]> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(patientId);

  const returnedDonationPreRatings: DonationPreRatingQuery[] = await dbClient
    .select({
      donationPreRating: donationPreRating,
      firstName: profiles.firstName,
      lastName: profiles.lastName,
      socialName: profiles.socialName,
      registrationNumber: doctors.registrationNumber,
    })
    .from(donationPreRating)
    .leftJoin(doctors, eq(donationPreRating.doctorId, doctors.id))
    .leftJoin(users, eq(doctors.userId, users.id))
    .leftJoin(profiles, eq(users.profileId, profiles.id))
    .where(eq(donationPreRating.doctorId, parsedId));

  const formattedDonationPreRatings = returnedDonationPreRatings.map((data) => formatDonationPreRatingReturn(data));

  return formattedDonationPreRatings;
}

async function getUniqueByDoctorId(
  userId: string,
): Promise<DonationPreRating | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedDonationPreRating = await dbClient
    .select({
      donationPreRating: donationPreRating,
      firstName: profiles.firstName,
      lastName: profiles.lastName,
      socialName: profiles.socialName,
      registrationNumber: doctors.registrationNumber,
    })
    .from(donationPreRating)
    .leftJoin(doctors, eq(donationPreRating.doctorId, doctors.id))
    .leftJoin(users, eq(doctors.userId, users.id))
    .leftJoin(profiles, eq(users.profileId, profiles.id))
    .where(eq(donationPreRating.doctorId, parsedId));

  if (returnedDonationPreRating.length === 0) return null;

  return formatDonationPreRatingReturn(returnedDonationPreRating[0]);
}

async function update(
  id: string,
  updatePatientAllergyDto: Partial<DonationPreRating>,
): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedDonationPreRating = await getUnique(parsedId);

  if (returnedDonationPreRating === null) return null;

  const parsedPatientAllergy = donationPreRatingSchema
    .partial()
    .parse(updatePatientAllergyDto);

  const updatedDonationPreRating = await dbClient
    .update(donationPreRating)
    .set(parsedPatientAllergy)
    .where(eq(donationPreRating.id, returnedDonationPreRating.id))
    .returning({ id: donationPreRating.id });

  if (updatedDonationPreRating.length === 0) return null;

  return true;
}
function formatDonationPreRatingReturn(
  data: DonationPreRatingQuery,
): DonationPreRating {
  let doctorName = '';

  if (data.firstName) {
    doctorName = data.socialName
      ? data.socialName
      : `${data.firstName} ${data.lastName}`;
  } else {
    doctorName = data.donationPreRating.doctorName as string;
  }

  return {
    id: data.donationPreRating.id,
    doctorName,
    doctorRegistrationNumber:
      data.registrationNumber ??
      data.donationPreRating.doctorRegistrationNumber,
    status: data.donationPreRating.status,
    isEligibility: data.donationPreRating.isEligibility,
    performedNecessaryTests: data.donationPreRating.performedNecessaryTests,
    testNotes: data.donationPreRating.testNotes,
    fullTestLink: data.donationPreRating.fullTestLink,
    type: data.donationPreRating.type,
    approved: data.donationPreRating.approved,
    doctorId: data.donationPreRating.doctorId,
    patientId: data.donationPreRating.patientId,
    createdAt: data.donationPreRating.createdAt,
    updatedAt: data.donationPreRating.updatedAt,
  };
}

export default {
  create,
  getUnique,
  getAll,
  getAllByPatientId,
  getAllByDoctorId,
  getUniqueByDoctorId,
  update,
};
