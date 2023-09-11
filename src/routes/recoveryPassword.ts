import { FastifyInstance } from 'fastify';
import recoveryPasswordController from '../controllers/recoveryPassword';

const recoveryPasswordRouter = async (fastify: FastifyInstance) => {
  fastify.post('/send-code', recoveryPasswordController.sendRecoveryCode);
  fastify.post('/validate-code', recoveryPasswordController.validateRecoveryCode);
  fastify.post('/change-password', recoveryPasswordController.changePassword);
};

export default recoveryPasswordRouter;
