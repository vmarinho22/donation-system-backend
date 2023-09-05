import { eq } from 'drizzle-orm';
import dbClient from '../clients/db';
import smsClient from '../clients/sms';
import env from "../config/env";
import { profiles } from '../db/schema/profiles';
import { users } from '../db/schema/users';
import { userPasswordRecovery } from '../db/schema/userPasswordRecoveries';
import ApiError from '../utils/errors/apiError';

function generateRandomCode() {
  const min = 100000;
  const max = 999999;
  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomCode;
}

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

export default {
  sendRecoveryCode
}