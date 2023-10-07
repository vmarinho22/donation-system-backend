import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import patientTransfusionHistoryService, { CreatePatientTransfusionHistoryDto } from "../services/patientTransfusionHistory";

async function create(
  _req: FastifyRequest<{ Body: CreatePatientTransfusionHistoryDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdPatientTransfusionHistory = await patientTransfusionHistoryService.create(body);

    if (!createdPatientTransfusionHistory) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ nurse: createdPatientTransfusionHistory });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const patientTransfusionHistories = await patientTransfusionHistoryService.getAll();

    _reply.send(patientTransfusionHistories);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientTransfusionHistory = await patientTransfusionHistoryService.getUnique(id);

    if (!patientTransfusionHistory) {
      throw new ApiError(404, _req.t('patientTransfusionHistory:notFound'));
    }

    _reply.send(patientTransfusionHistory);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUniqueByPatientId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientTransfusionHistory = await patientTransfusionHistoryService.getUniqueByPatientId(id);

    if (!patientTransfusionHistory) {
      throw new ApiError(404, _req.t('patientTransfusionHistory:notFound'));
    }

    _reply.send(patientTransfusionHistory);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreatePatientTransfusionHistoryDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatePatientTransfusionHistoryDto = await patientTransfusionHistoryService.update(id, body);

    if (!updatePatientTransfusionHistoryDto) {
      throw new ApiError(404, _req.t('patientTransfusionHistoryDto:notFound'));
    }

    _reply.send({success: updatePatientTransfusionHistoryDto});
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  create,
  getAll,
  getUnique,
  getUniqueByPatientId,
  update,
}