import { FastifyReply, FastifyRequest } from "fastify";
import lang from "../config/lang";

async function auth(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    await _req.jwtVerify({
      maxAge: '1d'
    })
  } catch  {
    _reply.code(401).send({ error: true, message: lang.t('error:unauthorized') });
  }

}

export default auth;