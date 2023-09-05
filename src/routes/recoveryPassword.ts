import { FastifyInstance } from 'fastify';
import recoveryPasswordController from '../controllers/recoveryPassword';

const authRouter = async (fastify: FastifyInstance) => {
  fastify.post('/send-code', recoveryPasswordController.sendRecoveryCode);
};

export default authRouter;
