import { address } from './../db/schema/address';
import { FastifyReply, FastifyRequest } from "fastify";
import registerService from "../services/register";
import { InferModel } from "drizzle-orm";
import { users } from "../db/schema/users";
import { profiles } from "../db/schema/profiles";
import ApiError from "../utils/errors/apiError";
import { ZodError } from 'zod';


export type registerDTO = {
  user: Omit<InferModel<typeof users, "insert">, 'profileId'>;
  profile: InferModel<typeof profiles, "insert">;
  address: InferModel<typeof address, "insert">;
}

async function register(_req: FastifyRequest<{ Body: registerDTO }>, _reply: FastifyReply) {
  const body = _req.body ?? {};

  const dataValidation = ['user', 'profile', 'address'];

  for(const data of dataValidation) {
    if (!Object.hasOwn(body, data)) {
      throw new ApiError(400, `Missing ${data} data`);
    }
  }
  
  const { user, profile, address } = body;

  try {
    const token = await registerService.register({ user, profile, address});
    _reply.send({ token });
  } catch (error) {
    const returnedError = {
      message: '',
      code: 500,
    };

    if (error instanceof ZodError) {
      const errorData = error as ZodError;
      returnedError.message = `Invalid type of data: ${errorData.errors.map((error) => error.path.join('')).join(', ')}`
    }

    returnedError.message = (error as Error).message;

    throw new ApiError(returnedError.code, returnedError.message);
  }
}

export default {
  register
}