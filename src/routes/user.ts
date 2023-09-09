import { FastifyInstance } from 'fastify';
import userController from '../controllers/user';
import auth from '../hooks/auth';

const userRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.get('/', userController.getAll);
  fastify.get('/:id', userController.getUnique);
  fastify.put('/:id', userController.update);
  fastify.put('/update-login/:id', userController.updateLastLogin);
};

export default userRouter;
