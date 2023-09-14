import { z } from "zod";
import bcrypt from 'bcryptjs';
import { server } from '..';
import { users } from '../db/schema/users';
import dbClient from '../clients/db';
import { eq } from 'drizzle-orm';

type AuthReturn = {
  token: string;
  userId: string;
}

async function authenticate(email: string, password: string): Promise<AuthReturn | null> {
  const parsedData = z.object({
    email: z.string().email(),
    password: z.string(),
  }).parse({ email, password });

  const returnedUser = await dbClient.select({
    id: users.id,
    email: users.email,
    password: users.password,
    role: users.role,
  }).from(users).where(eq(users.email, parsedData.email));

  if (returnedUser.length === 0) return null;

  const user = returnedUser[0];

  const isPasswordCorrect = await bcrypt.compare(parsedData.password, user.password);

  if (!isPasswordCorrect) return null;

  const token = server.jwt.sign({ userId: user.id, role: user.role }, { expiresIn: '1d' });

  return { token, userId: user.id };

}

export default {
  authenticate
}