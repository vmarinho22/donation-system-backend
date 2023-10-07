import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import doctorsService, { CreateDoctorDto } from "../services/doctors";

async function create(
  _req: FastifyRequest<{ Body: CreateDoctorDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdDoctor = await doctorsService.create(body);

    if (!createdDoctor) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ doctor: createdDoctor });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const doctors = await doctorsService.getAll();

    _reply.send(doctors);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const doctor = await doctorsService.getUnique(id);

    if (!doctor) {
      throw new ApiError(404, _req.t('doctor:notFound'));
    }

    _reply.send(doctor);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUniqueByUserId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const doctor = await doctorsService.getUniqueByUserId(id);

    if (!doctor) {
      throw new ApiError(404, _req.t('doctor:notFound'));
    }

    _reply.send(doctor);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreateDoctorDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updateDoctor = await doctorsService.update(id, body);

    if (!updateDoctor) {
      throw new ApiError(404, _req.t('doctor:notFound'));
    }

    _reply.send({success: updateDoctor});
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  create,
  getAll,
  getUnique,
  getUniqueByPatientId: getUniqueByUserId,
  update,
}