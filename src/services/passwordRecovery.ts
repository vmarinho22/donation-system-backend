import { and, desc, eq } from 'drizzle-orm';
import dbClient from '../clients/db';
import smsClient from '../clients/sms';
import env from "../config/env";
import { profiles } from '../db/schema/profiles';
import { users } from '../db/schema/users';
import { userPasswordRecovery } from '../db/schema/userPasswordRecoveries';
import ApiError from '../utils/errors/apiError';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const MAX_CODE_LIFE_TIME_IN_HOUR = 3;

async function sendRecoveryCode(phone: string) {
  const code = generateRandomCode();

  const returnedUser = await dbClient.select({
    id: users.id,
    phone: profiles.phone,
  }).from(users).leftJoin(profiles, eq(profiles.id, users.profileId)).where(eq(profiles.phone, phone));

  if (returnedUser.length === 0) throw new ApiError(404, "User not found");

  const sendedSMS = await smsClient.send({ to: phone, from: env.SMS.FROM, text: `Seu codigo de recuperacao é: ${code}\n` });

  const messageId = sendedSMS.messages[0]["message-id"];

  const createdPasswordRecovery = await dbClient.insert(userPasswordRecovery).values({ 
    userId: returnedUser[0].id, 
    code, 
    messageId,
    validate: new Date() 
  }).returning({ id: userPasswordRecovery.id  });

  if (createdPasswordRecovery.length === 0) throw new ApiError(500, "Internal server error");
}

function generateRandomCode() {
  const min = 100000;
  const max = 999999;
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomCode;
}

async function validateRecoveryCode(email: string, code: number) {

  const dataValidation = z.object({
    email: z.string().email(),
    code: z.number().min(100000).max(999999),
  }).parse({ email, code });

  const returnedUser = await dbClient.select({
    id: users.id,
    code: userPasswordRecovery.code,
    validate: userPasswordRecovery.validate,
  }).from(users).leftJoin(userPasswordRecovery, eq(userPasswordRecovery.userId, users.id)).where(
    and(
      eq(users.email, dataValidation.email), 
      eq(userPasswordRecovery.code, dataValidation.code))
  ).orderBy(desc(userPasswordRecovery.createdAt)).limit(1);

  if (returnedUser.length === 0) throw new ApiError(401, "The provided code is invalid");

  const isValidCode = validateCodeLifeTime(returnedUser[0].validate as Date);

  if (!isValidCode) throw new ApiError(401, "The provided code is expired");
  
  return returnedUser[0].id;
}

function validateCodeLifeTime (validate: Date): boolean {
  const now = new Date();
  const diff = now.getTime() - validate.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  return hours <= MAX_CODE_LIFE_TIME_IN_HOUR;
}

async function changePassword(email: string, password: string, code: number) {

  const dataSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(30),
    code: z.number(),
  }).parse({ email, password, code });
  
  const user = await validateRecoveryCode(dataSchema.email, dataSchema.code);

  const hashedPassword: string = await bcrypt.hash(dataSchema.password, 12);

  const updatedUser = await dbClient.update(users).set({ password: hashedPassword }).where(eq(users.id, user)).returning({ id: users.id });

  if (updatedUser.length === 0) throw new ApiError(500, "Internal server error");
}

export default {
  sendRecoveryCode,
  validateRecoveryCode,
  changePassword
}