import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import nursesService, { CreateNurseDto } from "../services/nurses";

async function create(
  _req: FastifyRequest<{ Body: CreateNurseDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdNurse = await nursesService.create(body);

    if (!createdNurse) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ nurse: createdNurse });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const nurses = await nursesService.getAll();

    _reply.send(nurses);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const nurse = await nursesService.getUnique(id);

    if (!nurse) {
      throw new ApiError(404, _req.t('nurse:notFound'));
    }

    _reply.send(nurse);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUniqueByUserId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const nurse = await nursesService.getUniqueByUserId(id);

    if (!nurse) {
      throw new ApiError(404, _req.t('nurse:notFound'));
    }

    _reply.send(nurse);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreateNurseDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updateNurse = await nursesService.update(id, body);

    if (!updateNurse) {
      throw new ApiError(404, _req.t('doctor:notFound'));
    }

    _reply.send({success: updateNurse});
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  create,
  getAll,
  getUnique,
  getUniqueByUserId,
  update,
}