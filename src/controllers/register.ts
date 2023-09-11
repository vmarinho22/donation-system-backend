import { address } from './../db/schema/address';
import { FastifyReply, FastifyRequest } from "fastify";
import registerService from "../services/register";
import { InferModel } from "drizzle-orm";
import { users } from "../db/schema/users";
import { profiles } from "../db/schema/profiles";
import ApiError from "../utils/errors/apiError";
import errorDistributor from '../utils/errorDistributor';


export type RegisterDTO = {
  user: Omit<InferModel<typeof users, "insert">, 'profileId'>;
  profile: InferModel<typeof profiles, "insert">;
  address: InferModel<typeof address, "insert">;
}

async function register(_req: FastifyRequest<{ Body: RegisterDTO }>, _reply: FastifyReply) {
  const body = _req.body ?? {};

  const dataValidation = ['user', 'profile', 'address'];

  for(const data of dataValidation) {
    if (!Object.hasOwn(body, data)) {
      throw new ApiError(400, _req.t('error:missingData', { key: data }));
    }
  }
  
  const { user, profile, address } = body;

  try {
    const token = await registerService.register({ user, profile, address});
    _reply.send({ token });
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  register
}