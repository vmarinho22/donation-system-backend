import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import patientBloodDataService, { CreatePatientBloodDataDto } from "../services/patientBloodData";

async function create(
  _req: FastifyRequest<{ Body: CreatePatientBloodDataDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdPatientBloodData = await patientBloodDataService.create(body);

    if (!createdPatientBloodData) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ patientBloodData: createdPatientBloodData });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const patientBloodData = await patientBloodDataService.getAll();

    _reply.send(patientBloodData);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientBloodData = await patientBloodDataService.getUnique(id);

    if (!patientBloodData) {
      throw new ApiError(404, _req.t('patientBloodData:notFound'));
    }

    _reply.send(patientBloodData);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getByPatientId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientBloodData = await patientBloodDataService.getByPatientId(id);

    if (!patientBloodData) {
      throw new ApiError(404, _req.t('patientBloodData:notFound'));
    }

    _reply.send(patientBloodData);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreatePatientBloodDataDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatedPatientBloodData = await patientBloodDataService.update(id, body);

    if (!updatedPatientBloodData) {
      throw new ApiError(404, _req.t('patientBloodData:notFound'));
    }

    _reply.send({success: updatedPatientBloodData});
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  create,
  getAll,
  getUnique,
  getByPatientId,
  update,
}