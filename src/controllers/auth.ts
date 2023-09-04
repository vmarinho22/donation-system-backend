import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import authService from '../services/auth';
import errorDistributor from "../utils/errorDistributor";

type authenticateDTO = {
  email: string;
  password: string;
}

async function authenticate(_req: FastifyRequest<{ Body: authenticateDTO }>, _reply: FastifyReply) {
  const body = _req.body ?? {};

  const dataValidation = ['email', 'password'];

  for(const data of dataValidation) {
    if (!Object.hasOwn(body, data)) {
      throw new ApiError(400, `Missing ${data} data`);
    }
  }

  const { email, password } = body;

  try {
    const token = await authService.authenticate(email, password);

    if (!token) {
      throw new ApiError(401, 'Invalid credentials');
    }

    _reply.send({ token });
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  authenticate
}
