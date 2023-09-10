import { z } from "zod";
import dbClient from '../clients/db';
import { profiles } from "../db/schema/profiles";
import { eq } from "drizzle-orm";

const profileSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  socialName: z.string().nullable(),
  lang: z.enum(['pt_br', 'en_us']).nullable(),
  photoUrl: z.string(),
  phone: z.string(),
  addressId: z.string().uuid(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type Profile = z.infer<typeof profileSchema>;

const createProfileDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  socialName: z.string().nullable(),
  lang: z.enum(['pt_br', 'en_us']).nullable(),
  photoUrl: z.string(),
  phone: z.string(),
  addressId: z.string().uuid(),
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

async function update(id: string, profile: Partial<Profile>): Promise<boolean | null> {
  const returnedProfile = await getUnique(id);

  if (returnedProfile === null) return null;

  const partialProfile = profileSchema.partial().parse(profile);

  await dbClient.update(profiles).set(partialProfile).where(eq(profiles.id, returnedProfile.id));

  return true;
}

export default {
  create,
  getUnique,
  getAll,
  update
}