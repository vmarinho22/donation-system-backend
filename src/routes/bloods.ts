import { FastifyInstance } from 'fastify';
import bloodsController from '../controllers/bloods';
import auth from '../hooks/auth';

const bloodsRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.get('/', bloodsController.getAll);
  fastify.get('/:id', bloodsController.getUnique);
};

export default bloodsRouter;
