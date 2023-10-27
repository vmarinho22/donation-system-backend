import { z } from 'zod';
import dbClient from '../clients/db';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { doctors } from '../db/schema/doctors';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema/users';
import { profiles } from '../db/schema/profiles';

const doctorsSchema = createSelectSchema(doctors);

export type Doctor = z.infer<typeof doctorsSchema>;

export type CreateDoctorDto = Omit<
  Doctor,
  | 'id'
  | 'subspecialties'
  | 'disabled'
  | 'disabledAt'
  | 'createdAt'
  | 'updatedAt'
>;

async function create(
  createDoctorDto: CreateDoctorDto,
): Promise<string | null> {
  const parsedDoctor = createInsertSchema(doctors).parse(createDoctorDto);

  const createdDoctor = await dbClient
    .insert(doctors)
    .values(parsedDoctor)
    .returning({ id: doctors.id });

  if (createdDoctor.length === 0) return null;

  return createdDoctor[0].id;
}

async function getUnique(id: string): Promise<Doctor | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedDoctor = await dbClient
    .select({
      id: doctors.id,
      firstName: profiles.firstName,
      lastName: profiles.lastName,
      email: users.email,
      socialName: profiles.socialName,
      specialty: doctors.specialty,
      registrationNumber: doctors.registrationNumber,
      subspecialties: doctors.subspecialties,
      emergencyTelContact: doctors.emergencyTelContact,
      disabled: doctors.disabled,
      disabledAt: doctors.disabledAt,
      userId: doctors.userId,
      createdAt: doctors.createdAt,
      updatedAt: doctors.updatedAt,
    })
    .from(doctors)
    .leftJoin(users, eq(doctors.userId, users.id))
    .leftJoin(profiles, eq(users.profileId, profiles.id))
    .where(eq(doctors.id, parsedId));

  if (returnedDoctor.length === 0) return null;

  return returnedDoctor[0];
}

async function getAll(): Promise<Doctor[]> {
  const returnedDoctors = await dbClient.select({
    id: doctors.id,
    firstName: profiles.firstName,
    lastName: profiles.lastName,
    email: users.email,
    socialName: profiles.socialName,
    specialty: doctors.specialty,
    registrationNumber: doctors.registrationNumber,
    subspecialties: doctors.subspecialties,
    emergencyTelContact: doctors.emergencyTelContact,
    disabled: doctors.disabled,
    disabledAt: doctors.disabledAt,
    userId: doctors.userId,
    createdAt: doctors.createdAt,
    updatedAt: doctors.updatedAt,
  })
  .from(doctors)
  .leftJoin(users, eq(doctors.userId, users.id))
  .leftJoin(profiles, eq(users.profileId, profiles.id));

  return returnedDoctors;
}

async function getUniqueByUserId(userId: string): Promise<Doctor | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(userId);

  const returnedDoctor = await dbClient
    .select({
      id: doctors.id,
      firstName: profiles.firstName,
      lastName: profiles.lastName,
      email: users.email,
      socialName: profiles.socialName,
      specialty: doctors.specialty,
      registrationNumber: doctors.registrationNumber,
      subspecialties: doctors.subspecialties,
      emergencyTelContact: doctors.emergencyTelContact,
      disabled: doctors.disabled,
      disabledAt: doctors.disabledAt,
      userId: doctors.userId,
      createdAt: doctors.createdAt,
      updatedAt: doctors.updatedAt,
    })
    .from(doctors)
    .leftJoin(users, eq(doctors.userId, users.id))
    .leftJoin(profiles, eq(users.profileId, profiles.id))
    .where(eq(doctors.userId, parsedId));

  if (returnedDoctor.length === 0) return null;

  return returnedDoctor[0];
}

async function update(
  id: string,
  updateDoctorDto: Partial<Doctor>,
): Promise<boolean | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedDoctor = await getUnique(parsedId);

  if (returnedDoctor === null) return null;

  const parsedDoctor = createSelectSchema(doctors)
    .partial()
    .parse(updateDoctorDto);

  const updatedDoctor = await dbClient
    .update(doctors)
    .set(parsedDoctor)
    .where(eq(doctors.id, returnedDoctor.id))
    .returning({ id: doctors.id });

  if (updatedDoctor.length === 0) return null;

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  getUniqueByUserId,
  update,
};
