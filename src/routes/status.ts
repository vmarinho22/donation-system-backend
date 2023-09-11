import { FastifyInstance } from 'fastify';

const statusRouter = async (fastify: FastifyInstance) => {
  fastify.get('/', (_req, _res) => {
    _res.status(200).send({ status: 'ok' });
  });
};

export default statusRouter;
