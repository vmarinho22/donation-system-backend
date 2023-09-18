import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import bloodService from "../services/blood";

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const blood = await bloodService.getUnique(id);

    if (!blood) {
      throw new ApiError(404, _req.t('blood:notFound'));
    }

    _reply.send(blood);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const bloods = await bloodService.getAll();

    _reply.send(bloods);
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  getUnique,
  getAll
}