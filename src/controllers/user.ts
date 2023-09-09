import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import userService, { User } from '../services/user'
import errorDistributor from "../utils/errorDistributor";

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const user = await userService.getUnique(id);

    if (!user) {
      throw new ApiError(404, _req.t('user:notFound'));
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
async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<User> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const { body } = _req;

  try {
    const user = await userService.update(id, body);

    if (!user) {
      throw new ApiError(404, _req.t('user:notFound'));
    }

    _reply.send({ success: user });
  } catch (error) {
    errorDistributor(error);
  }
}

async function updateLastLogin(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const user = await userService.update(id, { lastLogin: new Date() });

    if (!user) {
      throw new ApiError(404, _req.t('user:notFound'));
    }

    _reply.send({ success: user });
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  getUnique,
  getAll,
  update,
  updateLastLogin
};