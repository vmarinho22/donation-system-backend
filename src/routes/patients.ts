import { FastifyInstance } from 'fastify';
import patientController from '../controllers/patients';
import auth from '../hooks/auth';

const patientRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', auth);

  fastify.post('/', patientController.create);
  fastify.get('/', patientController.getAll);
  fastify.get('/:id', patientController.getUnique);
  fastify.put('/:id', patientController.update);
};

export default patientRouter;
