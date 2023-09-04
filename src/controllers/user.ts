import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import userService from '../services/user'
import errorDistributor from "../utils/errorDistributor";

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const user = await userService.getUnique(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    _reply.send(user);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {
  try {
    const users = await userService.getAll();

    _reply.send(users);
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  getUnique,
  getAll
};