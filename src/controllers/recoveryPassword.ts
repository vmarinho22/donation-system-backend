import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import recoveryPasswordService from "../services/passwordRecovery";

type RecoveryCodeDto = {
  phone: string;
}

type ValidateRecoveryCodeDto = {
  email: string;
  code: number;
};

type ChangePasswordDto = ValidateRecoveryCodeDto & { password: string }

async function sendRecoveryCode(_req: FastifyRequest<{ Body: RecoveryCodeDto }>, _reply: FastifyReply) {
  const body = _req.body ?? {};

  const dataValidation = ['phone'];

  for(const data of dataValidation) {
    if (!Object.hasOwn(body, data)) {
      throw new ApiError(400, _req.t('error:missingData', { key: data }));
    }
  }
  
  const { phone } = body;

  try {
    await recoveryPasswordService.sendRecoveryCode(phone);
    _reply.send({ success: true });
  } catch (error) {
    errorDistributor(error);
  }
}

async function validateRecoveryCode(_req: FastifyRequest<{ Body: ValidateRecoveryCodeDto }>, _reply: FastifyReply) {
  const body = _req.body ?? {};

  const dataValidation = ['email', 'code'];

  for(const data of dataValidation) {
    if (!Object.hasOwn(body, data)) {
      throw new ApiError(400, `Missing ${data} data`);
    }
  }
  
  const { email, code } = body;

  try {
    await recoveryPasswordService.validateRecoveryCode(email, code);
    _reply.send({ success: true });
  } catch (error) {
    errorDistributor(error);
  }
}
async function changePassword(_req: FastifyRequest<{ Body: ChangePasswordDto }>, _reply: FastifyReply) {
  const body = _req.body ?? {};

  const dataValidation = ['email', 'password', 'code'];

  for(const data of dataValidation) {
    if (!Object.hasOwn(body, data)) {
      throw new ApiError(400, `Missing ${data} data`);
    }
  }
  
  const { email, password, code } = body;

  try {
    await recoveryPasswordService.changePassword(email, password, code);
    _reply.send({ success: true });
  } catch (error) {
    errorDistributor(error);
  }
}

export default {
  sendRecoveryCode,
  validateRecoveryCode,
  changePassword
}