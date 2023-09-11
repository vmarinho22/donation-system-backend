import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import medicalRecordsService, { CreateMedicalRecordDto }  from "../services/medicalRecords";

async function create(
  _req: FastifyRequest<{ Body: CreateMedicalRecordDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdMedicalRecord = await medicalRecordsService.create(body);

    if (!createdMedicalRecord) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ MedicalRecord: createdMedicalRecord });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const medicalRecord = await medicalRecordsService.getUnique(id);

    if (!medicalRecord) {
      throw new ApiError(404, _req.t('medicalRecord:notFound'));
    }

    _reply.send(medicalRecord);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const medicalRecords = await medicalRecordsService.getAll();

    _reply.send(medicalRecords);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreateMedicalRecordDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatedProfile = await medicalRecordsService.update(id, body);

    if (!updatedProfile) {
      throw new ApiError(404, _req.t('medicalRecord:notFound'));
    }

    _reply.send({success: updatedProfile});
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