import { FastifyInstance } from 'fastify';
import nursesController from '../controllers/nurses';
import auth from '../hooks/auth';

const nursesRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', nursesController.create);
  fastify.get('/', nursesController.getAll);
  fastify.get('/:id', nursesController.getUnique);
  fastify.get('/by-user/:id', nursesController.getUniqueByUserId);
  fastify.put('/:id', nursesController.update);
};

export default nursesRouter;
