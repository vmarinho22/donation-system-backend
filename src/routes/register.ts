import { FastifyInstance } from 'fastify';
import registerController from '../controllers/register';

const registerRouter = async (fastify: FastifyInstance) => {
  // Middleware example
  // fastify.register(authenticate);

  fastify.post('/', registerController.register);
};

export default registerRouter;
