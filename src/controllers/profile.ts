import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../utils/errors/apiError';
import profileService from '../services/profile';
import errorDistributor from '../utils/errorDistributor';
import hasNoMandatoryAttribute from '../validators/hasNoMandatoryAttribute';

type createUserParams = {
  firstName: string
  lastName: string
  socialName: string | null
  lang: "pt_br" | "en_us" | null
  photoUrl: string
  phone: string
  addressId: string
};

async function create(
  _req: FastifyRequest<{ Body: createUserParams }>,
  _reply: FastifyReply,
) {
  const body = _req.body ?? {};

  const dataValidation = [
    'firstName',
    'lastName',
    'photoUrl',
    'phone',
    'addressId',
  ];

  const attrError = hasNoMandatoryAttribute(dataValidation, body);

  if (attrError) {
    throw new ApiError(400, _req.t('error:missingData', { key: attrError }));
  }

  const { firstName, lastName, socialName = null, lang = null, photoUrl, phone, addressId } =
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

export default {
  create,
};
