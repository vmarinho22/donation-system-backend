import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import userService from '../services/user'

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const user = await userService.getUnique(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    _reply.send(user);
  } catch (error) {

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, (error as Error).message);
  }

  _reply.send({ id });
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {
  try {
    const users = await userService.getAll();

    _reply.send(users);
  } catch (error) {

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, (error as Error).message);
  }
}

export default {
  getUnique,
  getAll
}