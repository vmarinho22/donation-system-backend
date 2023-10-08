import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import patientBloodDonationsService, { CreatePatientBloodDonationDto } from "../services/patientBloodDonations";

async function create(
  _req: FastifyRequest<{ Body: CreatePatientBloodDonationDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdPatientBloodDonation = await patientBloodDonationsService.create(body);

    if (!createdPatientBloodDonation) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ patientBloodDonation: createdPatientBloodDonation });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const PatientBloodDonationS = await patientBloodDonationsService.getAll();

    _reply.send(PatientBloodDonationS);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientBloodDonation = await patientBloodDonationsService.getUnique(id);

    if (!patientBloodDonation) {
      throw new ApiError(404, _req.t('patientBloodDonation:notFound'));
    }

    _reply.send(patientBloodDonation);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getByPatientId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const patientBloodDonations = await patientBloodDonationsService.getByPatientId(id);

    if (!patientBloodDonations) {
      throw new ApiError(404, _req.t('patientBloodDonation:notFound'));
    }

    _reply.send(patientBloodDonations);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreatePatientBloodDonationDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatePatientBloodDonationDto = await patientBloodDonationsService.update(id, body);

    if (!updatePatientBloodDonationDto) {
      throw new ApiError(404, _req.t('patientTransfusionHistoryDto:notFound'));
    }

    _reply.send({success: updatePatientBloodDonationDto});
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