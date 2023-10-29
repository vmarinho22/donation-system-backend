import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../utils/errors/apiError';
import profileService from '../services/profile';
import errorDistributor from '../utils/errorDistributor';
import hasNoMandatoryAttribute from '../validators/hasNoMandatoryAttribute';

type CreateProfileDto = {
  firstName: string
  lastName: string
  socialName: string | null
  lang: "pt_br" | "en_us" | null
  photoUrl: string
  phone: string
  addressId: string
};

async function create(
  _req: FastifyRequest<{ Body: CreateProfileDto }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  const dataValidation = [
    'firstName',
    'lastName',
    'photoUrl',
    'phone',
  ];

  const attrError = hasNoMandatoryAttribute(dataValidation, body);

  if (attrError) {
    throw new ApiError(400, _req.t('error:missingData', { key: attrError }));
  }

  const { firstName, lastName, socialName = null, lang = null, photoUrl, phone, addressId = null } =
    body;

  try {
    const createdProfile = await profileService.create({ firstName, lastName, socialName, lang, photoUrl, phone, addressId });

    if (!createdProfile) {
      throw new ApiError(500, _req.t('error:internalError'));
    }

    _reply.send({ profile: createdProfile });
  } catch (error) {
    errorDistributor(error);
  }
}

async function getUnique(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const profile = await profileService.getUnique(id);

    if (!profile) {
      throw new ApiError(404, _req.t('profile:notFound'));
    }

    _reply.send(profile);
  } catch (error) {
    errorDistributor(error);
  }
}

async function getAll(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    const profiles = await profileService.getAll();

    _reply.send(profiles);
  } catch (error) {
    errorDistributor(error);
  }
}

async function update(_req: FastifyRequest<{ Params: { id: string }, Body: Partial<CreateProfileDto> }>, _reply: FastifyReply) {
  const { id } = _req.params;
  const body = _req.body ?? {};

  try {
    const updatedProfile = await profileService.update(id, body);

    if (!updatedProfile) {
      throw new ApiError(404, _req.t('profile:notFound'));
    }

    _reply.send({success: updatedProfile});
  } catch (error) {
    errorDistributor(error);
  }
}

async function getFull(_req: FastifyRequest<{ Params: { id: string }}>, _reply: FastifyReply) {
  const { id } = _req.params;

  try {
    const profile = await profileService.getFullProfile(id);

    if (!profile) {
      throw new ApiError(404, _req.t('profile:notFound'));
    }

    _reply.send(profile);
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  create,
  getUnique,
  getAll,
  update,
  getFull
};
