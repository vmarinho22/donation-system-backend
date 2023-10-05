import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import patientAllergiesService, { CreatePatientAllergyDto } from "../services/patientAllergies";

async function create(
  _req: FastifyRequest<{ Body: CreatePatientAllergyDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdPatientAllergy = await patientAllergiesService.create(body);

    if (!createdPatientAllergy) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ patientAllergy: createdPatientAllergy });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const patientAllergies = await patientAllergiesService.getAll();

    _reply.send(patientAllergies);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientAllergy = await patientAllergiesService.getUnique(id);

    if (!patientAllergy) {
      throw new ApiError(404, _req.t('patientAllergy:notFound'));
    }

    _reply.send(patientAllergy);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUniqueByPatientId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientAllergy = await patientAllergiesService.getUniqueByPatientId(id);

    if (!patientAllergy) {
      throw new ApiError(404, _req.t('patientAllergy:notFound'));
    }

    _reply.send(patientAllergy);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreatePatientAllergyDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatePatientAllergy = await patientAllergiesService.update(id, body);

    if (!updatePatientAllergy) {
      throw new ApiError(404, _req.t('patientAllergy:notFound'));
    }

    _reply.send({success: updatePatientAllergy});
  } catch (error) {
    errorDistributor(error);
  }
}

async function remove(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const removedPatientAllergy = await patientAllergiesService.remove(id);

    if (!removedPatientAllergy) {
      throw new ApiError(404, _req.t('patientAllergy:notFound'));
    }

    _reply.send(removedPatientAllergy);
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
  remove
}