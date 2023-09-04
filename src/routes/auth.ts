import { FastifyInstance } from 'fastify';
import authController from '../controllers/auth';

const authRouter = async (fastify: FastifyInstance) => {
  fastify.post('/signin', authController.authenticate);
};

export default authRouter;
