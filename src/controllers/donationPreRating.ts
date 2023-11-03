import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import donationPreRatingService, { CreateDonationPreRatingDto } from "../services/donationPreRating";

async function create(
  _req: FastifyRequest<{ Body: CreateDonationPreRatingDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  try {
    const createdDonationPreRating = await donationPreRatingService.create(body);

    if (!createdDonationPreRating) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ donationPreRating: createdDonationPreRating });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const donationPreRatings = await donationPreRatingService.getAll();

    _reply.send(donationPreRatings);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const donationPreRating = await donationPreRatingService.getUnique(id);

    if (!donationPreRating) {
      throw new ApiError(404, _req.t('donationPreRating:notFound'));
    }

    _reply.send(donationPreRating);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUniqueByDoctorId(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const donationPreRating = await donationPreRatingService.getUniqueByDoctorId(id);

    if (!donationPreRating) {
      throw new ApiError(404, _req.t('donationPreRating:notFound'));
    }

    _reply.send(donationPreRating);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreateDonationPreRatingDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatedDonationPreRating = await donationPreRatingService.update(id, body);

    if (!updatedDonationPreRating) {
      throw new ApiError(404, _req.t('donationPreRating:notFound'));
    }

    _reply.send({ success: updatedDonationPreRating });
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  create,
  getAll,
  getUnique,
  getUniqueByDoctorId,
  update
}