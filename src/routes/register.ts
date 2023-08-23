import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const registerRouter = async (fastify: FastifyInstance) => {
  // Middleware example
  // fastify.register(authenticate);

  fastify.get('/', (_req: FastifyRequest, _reply: FastifyReply) => _reply.send({ Hello: 'World'}));
};

export default registerRouter;
