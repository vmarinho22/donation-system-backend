import { address } from './../db/schema/address';
import { users } from "../db/schema/users";
import { profiles } from "../db/schema/profiles";
import bcrypt from 'bcryptjs';
import { server } from '../index';
import { z } from "zod";

import { createInsertSchema } from 'drizzle-zod';
import dbClient from '../clients/db';
import { registerDTO } from "../controllers/register";

async function register(data: registerDTO) {

  const userInsertSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    cpf: z.string().length(11),
    role: z.enum(['patient', 'admin', 'entity', 'doctor']),
  });

  const profileInsertSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    photoUrl: z.string().url(),
  });

  const addressInsertSchema = createInsertSchema(address);
  
  const parsedUser = userInsertSchema.parse(data.user);
  const parsedProfile = profileInsertSchema.parse(data.profile);
  const parsedAddress = addressInsertSchema.parse(data.address);

  const hashedPassword: string = await bcrypt.hash(parsedUser.password, 12);

  let userId = undefined;

  await dbClient.transaction(async (trx) => {
    const addressData = await trx.insert(address).values(parsedAddress).returning({ id: address.id });
    const profileData = await trx.insert(profiles).values({ ...parsedProfile, addressId: addressData[0].id }).returning({ id: profiles.id });

    const userData = await trx.insert(users).values({
      ...parsedUser,
      password: hashedPassword,
      profileId: profileData[0].id, 
    }).returning({ id: users.id });

    userId = userData[0].id;
  });

  const token = server.jwt.sign({ userId })

  return token as string;
}

export default {
  register
}