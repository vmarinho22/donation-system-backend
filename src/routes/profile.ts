import { FastifyInstance } from 'fastify';
import profileController from '../controllers/profile';
import auth from '../hooks/auth';

const userRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', profileController.create);
  fastify.get('/:id', profileController.getUnique);
};

export default userRouter;
