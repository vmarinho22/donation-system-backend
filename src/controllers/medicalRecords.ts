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

export default {
  create
}