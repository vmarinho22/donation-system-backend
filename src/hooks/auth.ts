import { FastifyReply, FastifyRequest } from "fastify";

async function auth(_req: FastifyRequest, _reply: FastifyReply) {

  try {
    await _req.jwtVerify({
      maxAge: '1d'
    })
  } catch  {
    _reply.code(401).send({ error: true, message: 'Unauthorized' });
  }

}

export default auth;