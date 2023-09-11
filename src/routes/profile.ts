import { FastifyInstance } from 'fastify';
import profileController from '../controllers/profile';
import auth from '../hooks/auth';

const profileRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', profileController.create);
  fastify.get('/', profileController.getAll);
  fastify.get('/:id', profileController.getUnique);
  fastify.put('/:id', profileController.update);
  fastify.get('/full/:id', profileController.getFull);
};

export default profileRouter;
