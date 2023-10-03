import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import patientMedicamentsService, { CreatePatientMedicamentDto } from "../services/patientMedicaments";

async function create(
  _req: FastifyRequest<{ Body: CreatePatientMedicamentDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdPatientMedicament = await patientMedicamentsService.create(body);

    if (!createdPatientMedicament) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ patientMedicament: createdPatientMedicament });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const patientMedicaments = await patientMedicamentsService.getAll();

    _reply.send(patientMedicaments);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientMedicament = await patientMedicamentsService.getUnique(id);

    if (!patientMedicament) {
      throw new ApiError(404, _req.t('patientMedicament:notFound'));
    }

    _reply.send(patientMedicament);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUniqueByPatientId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientMedicament = await patientMedicamentsService.getUniqueByPatientId(id);

    if (!patientMedicament) {
      throw new ApiError(404, _req.t('patientMedicament:notFound'));
    }

    _reply.send(patientMedicament);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreatePatientMedicamentDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatedPatientMedicament = await patientMedicamentsService.update(id, body);

    if (!updatedPatientMedicament) {
      throw new ApiError(404, _req.t('patientMedicament:notFound'));
    }

    _reply.send({success: updatedPatientMedicament});
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