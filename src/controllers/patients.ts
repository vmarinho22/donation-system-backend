import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import patientsService, { CreatePatientDto }  from "../services/patients";

async function create(
  _req: FastifyRequest<{ Body: CreatePatientDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdPatient = await patientsService.create(body);

    if (!createdPatient) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ patient: createdPatient });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patient = await patientsService.getUnique(id);

    if (!patient) {
      throw new ApiError(404, _req.t('patient:notFound'));
    }

    _reply.send(patient);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const patients = await patientsService.getAll();

    _reply.send(patients);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreatePatientDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatedPatient = await patientsService.update(id, body);

    if (!updatedPatient) {
      throw new ApiError(404, _req.t('patient:notFound'));
    }

    _reply.send({success: updatedPatient});
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  create,
  getUnique,
  getAll,
  update
}