import { FastifyReply, FastifyRequest } from "fastify";
import ApiError from "../utils/errors/apiError";
import errorDistributor from "../utils/errorDistributor";
import recoveryPasswordService from "../services/passwordRecovery";

type recoveryCodeDto = {
  phone: string;
}

async function sendRecoveryCode(_req: FastifyRequest<{ Body: recoveryCodeDto }>, _reply: FastifyReply) {
  const body = _req.body ?? {};

  const dataValidation = ['phone'];

  for(const data of dataValidation) {
    if (!Object.hasOwn(body, data)) {
      throw new ApiError(400, `Missing ${data} data`);
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

export default {
  sendRecoveryCode
}