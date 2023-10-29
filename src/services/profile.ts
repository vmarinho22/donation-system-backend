import { z } from "zod";
import dbClient from '../clients/db';
import { profiles } from "../db/schema/profiles";
import { eq, or } from "drizzle-orm";
import { users } from "../db/schema/users";
import { address } from "../db/schema/address";

const profileSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  socialName: z.string().nullable(),
  lang: z.enum(['pt_br', 'en_us']).nullable(),
  photoUrl: z.string(),
  phone: z.string(),
  addressId: z.string().uuid().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;

export type FullProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  socialName: string | null;
  lang: "pt_br" | "en_us" | null;
  photoUrl: string;
  phone: string;
  address: {
    id: string;
    street: string;
    number: number | null;
    noNumber: boolean | null;
    postalCode: number;
    complement: string | null;
    district: string;
    city: string;
    state: string;
    country: string;
    uf: string;
  }
}

const createProfileDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  socialName: z.string().nullable(),
  lang: z.enum(['pt_br', 'en_us']).nullable(),
  photoUrl: z.string(),
  phone: z.string(),
  addressId: z.string().uuid().nullable(),
});

type CreateProfileDto = z.infer<typeof createProfileDtoSchema>;

async function create(profile: CreateProfileDto): Promise<string | null> {
  const parsedProfile = createProfileDtoSchema.parse(profile);

  const returnedProfile = await dbClient.insert(profiles).values(parsedProfile).returning({
    id: profiles.id,
  });

  if (returnedProfile.length === 0) return null;

  return returnedProfile[0].id;
}

async function getUnique(id: string): Promise<Profile | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedProfile = await dbClient.select().from(profiles).where(eq(profiles.id, parsedId));

  if (returnedProfile.length === 0) return null;

  return returnedProfile[0];
}

async function getAll(): Promise<Profile[]> {
  const returnedProfiles = await dbClient.select().from(profiles);

  return returnedProfiles;
}

async function update(id: string, updateProfileDto: Partial<Profile>): Promise<boolean | null> {
  const returnedProfile = await getUnique(id);

  if (returnedProfile === null) return null;

  const partialProfile = profileSchema.partial().parse(updateProfileDto);

  await dbClient.update(profiles).set(partialProfile).where(eq(profiles.id, returnedProfile.id));

  return true;
}

async function getFullProfile(id: string): Promise<FullProfile | null> {
  const idSchema = z.string().uuid();

  const parsedId = idSchema.parse(id);

  const returnedProfile = await dbClient.select({
    id: profiles.id,
    firstName: profiles.firstName,
    lastName: profiles.lastName,
    email: users.email,
    cpf: users.cpf,
    role: users.role,
    socialName: profiles.socialName,
    lang: profiles.lang,
    photoUrl: profiles.photoUrl,
    phone: profiles.phone,
    address: {
      id: address.id,
      street: address.street,
      number: address.number,
      noNumber: address.noNumber,
      postalCode: address.postalCode,
      complement: address.complement,
      district: address.district,
      city: address.city,
      state: address.state,
      country: address.country,
      uf: address.uf,
    }
  }).from(profiles)
  .innerJoin(users, eq(users.profileId, profiles.id))
  .innerJoin(address, eq(address.id, profiles.addressId))
  .where(or(eq(profiles.id, parsedId), eq(users.id, parsedId)));

  if (returnedProfile.length === 0) return null;

  return returnedProfile[0];
}

export default {
  create,
  getUnique,
  getAll,
  update,
  getFullProfile
}