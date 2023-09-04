import { FastifyInstance } from 'fastify';
import userController from '../controllers/user';
import auth from '../hooks/auth';

const userRouter = async (fastify: FastifyInstance) => {
  // Middleware example
  fastify.addHook('onRequest', auth);

  fastify.get('/', userController.getAll);
  fastify.get('/:id', userController.getUnique);
};

export default userRouter;
