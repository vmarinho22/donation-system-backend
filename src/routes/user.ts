import { FastifyInstance } from 'fastify';
import userController from '../controllers/user';

const userRouter = async (fastify: FastifyInstance) => {
  // Middleware example
  // fastify.register(authenticate);

  fastify.get('/:id', userController.getUnique);
};

export default userRouter;
